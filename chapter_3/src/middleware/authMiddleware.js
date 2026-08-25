import jwt from 'jsonwebtoken'

function authMiddleware (req, res, next) {
    // Inside index.html (line 225), fetchTodos() is called
    // Then inside fetchTodos() (line 251),
    // a GET network request is sent to this route.
    // Inside the headers (line 254), we add the token to Authorization.
    // When this network request is sent out, authMiddleware.js intercepts it and
    // check if the token is for a valid user then we only send them back 
    // todos associated with that particular user and token
    const token = req.headers['authorization']

    if (!token) { return res.status(401).json({message: "No token provided"})}

    jwt.verify(
        token, 
        process.env.JWT_SECRET, 
        (err, decoded) => {
            if (err) {return res.status(401).json({message: "Invalid token"})}

            // Adding to req parameter so the endpoint can directly access it 
            // E.g. in line 25 of todoRoutes.js: const todos = getTodos.all(req.userId)
            req.userId = decoded.id

            // Why we can directed write decoded.id:
            // When we created the token during registration and login,
            // const token = jwt.sign({ id: user.id },process.env.JWT_SECRET,{ expiresIn: '24h' })
            // we encoded the id
            // So after we decoded the token with jwt.verify(), we can call decoded.id

            // This is saying, you may now proceed to the next endpoint
            next()
        }
    )
}

export default authMiddleware