import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'

const router = express.Router()

// Register a new user endpoint /auth/register
router.post('/register', (req, res) => {
    // same as const body = req.body then call body.username and body.password
    const {username, password} = req.body

    // We save the username and an encrypted password that is not reversible

    // Encrypt the pasword
    const hashedPassword = bcrypt.hashSync(password, 8)
    
    // Save the new user and hashed password to the database
    try {
        const insertUser = db.prepare(`
            INSERT INTO users (username, password)
            VALUES (?, ?)
            `)

        const resultOfInsertNewUser = insertUser.run(username, hashedPassword)

        // After a new user is created, we add their first todo for them
        const defaultTodo = `Hello! Add your first todo`
        const insertTodo = db.prepare(`
            INSERT INTO todos (user_id, task)
            VALUES (?, ?)
            `)
        insertTodo.run(resultOfInsertNewUser.lastInsertRowid, defaultTodo)

        // We need to create a token associated with the network request
        // that confirms that they are in fact an authenticated user
        const token = jwt.sign(
            {id: resultOfInsertNewUser.lastInsertRowid}, 
            process.env.JWT_SECRET,
            // This special token that a user can attach to their network request
            // will expire in 24h, then they have to reauthenticate to gain access to a new token
            {expiresIn: '24h'}
        )
        // Sends back json as a response to frontend, 
        // so frontend can save it to its own local storage 
        // so that we can consistently access the token even if we refresh the page
        // (see line 214 to 219 in index.html)
        res.json({ token })


    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }    
})

router.post('/login', (req, res) => {
    // We get the email and look up the encrypted password associated 
    // with the email in the database
    // We encrypt the password we received and compare it with the the encrypted password
    // in the database (the encryption algorithm is deterministic)
    const {username, password} = req.body

    try {
        const getUser = db.prepare(`
            SELECT * FROM users WHERE username = ?
            `)
        const user = getUser.get(username)
        
        // If we cannot find a user associated with that username, return out from the function
        if (!user) {return res.status(404).send({ message: "User not found"})}

        const passwordIsValid = bcrypt.compareSync(password, user.password) // Returns a boolean
        
        // If provided password and stored password does not match, return out of the function
        if (!passwordIsValid) {return res.status(401).send({ message: "Invalid password"})}

        // After the 2 previous if statements checks, we have a successful authentication
        console.log(user)
        const token = jwt.sign(
            { id: user.id }, 
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )
        res.json({ token })

    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
})

export default router