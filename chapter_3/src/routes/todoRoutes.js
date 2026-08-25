import express from 'express'
import db from '../db.js'

const router = express.Router()

// Get all todos for logged-in user
router.get('/', (req, res) => {
    // Inside index.html (line 225), fetchTodos() is called
    // Then inside fetchTodos() (line 251),
    // a GET network request is sent to this route.
    // Inside the headers (line 254), we add the token to Authorization.
    // When this network request is sent out, authMiddleware.js intercepts it and
    // check if the token is for a valid user then we only send them back 
    // todos associated with that particular user and token

    const getTodos = db.prepare(`
        SELECT * FROM todos WHERE user_id = ?`)
     
    // We assume the req have access to userId because authMiddleware check already
    const todos = getTodos.all(req.userId)
    res.json(todos)
})

// Create a new todo
router.post('/', (req, res) => {
    const { task } = req.body

    try {
        const insertTodo = db.prepare(`
            INSERT INTO todos (user_id, task)
            VALUES (?, ?)
            `)
        const result = insertTodo.run(req.userId, task)
        res.json({ id: result.lastInsertRowid, task, completed: 0 })
    } catch (err) {
        console.log(err.message)
        res.sendStatus(500)
    }
    
})

// Update a todo
router.put('/:id', (req, res) => {
    const { completed } = req.body

    // this gets the 2 from the url http://localhost:5000/todos/2
    const { id } = req.params

    // extra knowledge: if the url have something like http://localhost:5000/todos/2?page=4
    // we can get the queries (the stuff after ? in the url)
    // const { page } = req.query

    try {
        const updatedTodo = db.prepare(`
            UPDATE todos 
            SET completed = ?
            WHERE id = ?
            `)
        updatedTodo.run(completed, id)
        res.json({ message: "Todo completed" })
    } catch (err) {
        console.log(err.message)
        res.sendStatus(500)
    }
})

// Delete a todo
router.delete('/:id', (req, res) => {
    
})

export default router