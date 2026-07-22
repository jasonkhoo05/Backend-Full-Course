const express = require('express')

const app = express()

const PORT = 3000

// Endpoints: HTTP VERBS (methods) and Routes

// Configuring our server to handle incoming get requests
// The first argument of get() is the route (/ here means home route)
// The second argument is the logic that runs when we receive a GET request
// req is request, res is response
app.get('/', (req, res) => {
    // This is an endpoint
    console.log('I hit an endpoint', req.method) // req.method is GET
    res.sendStatus(201) // response code 200 to 299 means success request
})

app.get('/dashboard', (req, res) => {
    console.log('I hit the /dashboard endpoint')
    res.send('hi')
})

app.listen(PORT, () => {console.log(`Server has started on: ${PORT}`)})
