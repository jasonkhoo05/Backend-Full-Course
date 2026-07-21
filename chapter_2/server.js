// Makes it so that Express package is required. We assign whatever is inside Express package to a 
// variable so that we can use it all throughout the project (basically import Express)
const express = require('express')

// Define backend application.
// This creates the backend application
const app = express()

// IP address is the address of the device, port is a location within the device
const PORT = 3000

// listens to incoming network requests to its IP address, specifically at this port
// () => {} is an arrow function (shortcut syntax)
// the second argument is a function to be executed when the server is up and running
app.listen(PORT, () => {console.log(`Server has started on: ${PORT}`)})

// enter node server.js in terminal to run this file
// After adding "dev": "node server.js" to scripts in package.json, 
// we can run "npm run dev" in terminal also

// "dev": "node server.js" becomes "dev": "nodemon server.js" in package.json after installing nodemon