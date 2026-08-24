import express from 'express'

const app = express()

// Checks if PORT env variable exists, if no use 5000
const PORT = process.env.PORT || 5000




app.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT}`)
})