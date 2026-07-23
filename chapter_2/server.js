const express = require('express')

const app = express()

const PORT = 3000

let data1 = ['jason']

// Middleware
// configures the server to expect json data as an incoming request (for POST method)
app.use(express.json())

// Website endpoints
app.get('/', (req, res) => {
    res.send(`
        <body style="background:pink;color:blue;">
            <h1>Data:</h1>
            <p>${JSON.stringify(data1)}</p>
            <a href="/dashboard">Dashboard</a>
        </body>
        `)
})

app.get('/dashboard', (req, res) => {
    console.log('I hit the /dashboard endpoint')
    res.send(`
        <body>
            <h1>Dashboard</h1>
            <a href="/">Home</a>
        </body>
        
        // This gets printed on client's console
        <script>console.log('This is my script')</script>
        `)
})

// API Endpoints
app.get('/api/data', (req, res) => {
    console.log('This is for data')
    res.send(data1)
})

app.post('/api/data', (req, res)=> {
    // E.g. someone wants to create a user when they click a sign up button
    // After the button is clicked, the browser is wired up to send out a network request 
    // to the server to handle this action, which is what this endpoint is for

    const newEntry = req.body // req.body is the data associated with the request
    // newEntry here is json because we configured our server to expect json data as an incoming request

    console.log(newEntry)

    // Here we append the name field of the json (newEntry) to data1 array
    data1.push(newEntry.name)

    res.sendStatus(201) // status code 201 means created
})

app.delete('/api/data', (req, res) => {
    data1.pop()
    console.log('Deleted the element at the end of the array')
    res.sendStatus(203)
})

app.listen(PORT, () => {console.log(`Server has started on: ${PORT}`)})
