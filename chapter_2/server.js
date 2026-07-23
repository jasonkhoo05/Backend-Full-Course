const express = require('express')

const app = express()

const PORT = 3000

let data1 = {
    name: 'Jason'
}

// Endpoints: HTTP VERBS (methods) and Routes

// Website endpoints
app.get('/', (req, res) => {
    res.send(`
        <body style="background:pink;color:blue;">
            <h1>Data:</h1>
            <p>${JSON.stringify(data1)}</p>
        </body>
        `)
})

app.get('/dashboard', (req, res) => {
    console.log('I hit the /dashboard endpoint')
    res.send('<h1>Dashboard</h1>')
})

// API Endpoints
app.get('/api/data', (req, res) => {
    console.log('This is for data')
    res.send(data1)
})


app.listen(PORT, () => {console.log(`Server has started on: ${PORT}`)})
