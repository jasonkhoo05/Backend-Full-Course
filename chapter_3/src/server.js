import express from 'express'

// These 2 imports enable our Javascript server.js file to look for the HTML files
// and consequently send them back as a response
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const app = express()

// Checks if PORT env variable exists, if no use 5000
const PORT = process.env.PORT || 5000

// Get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url)
// Get the directory name from the file path
const __dirname = dirname(__filename)

// Middleware 1
app.use(express.json())
//  Middleware 2
// Serves the HTML file from the /public directory
// Tells express to serve all files from the public folder as static assets/files
// Any requests for the css files will be resolved to the public directory

// Initially, if we run res.sendFile(path.join(__dirname, 'public', 'index.html')) e.g. in app.get('/', (req, res)
// the path is:
// C:\Backend_Full_Course\Backend-Full-Course\chapter_3\src\public\index.html'
// But public is not within src, so we tell it to go back up one level
// express.static(file path) means When the browser requests a file,
// check whether that file exists inside this directory. 
// If it does, send it back.
// By defauly express.static search for index.html
app.use(express.static(path.join(__dirname, '../public')))

// app.use(express.static(path.join(__dirname, '../public'))) already serves index.html when browser calls /
// We can do additional behaviour here
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'))
})


app.listen(PORT, () => {
    console.log(`Server has started on port: ${PORT}`)
})