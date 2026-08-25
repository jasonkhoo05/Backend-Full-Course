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
    
})

// Update a todo
router.put('/:id', (req, res) => {
    
})

// Delete a todo
router.delete('/:id', (req, res) => {
    
})

export default router