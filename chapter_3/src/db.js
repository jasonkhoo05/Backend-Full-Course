import { DatabaseSync } from 'node:sqlite'
// ':memory:' tells it to store completely in memory instead of a file externally
const db = new DatabaseSync(':memory:')

// Execute SQL statements from strings
db.exec(`
    CREATE TABLE user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user TEXT UNIQUE,
        password TEXT
    )
`)

// user_id cross-reference to id in user table
db.exec(`
    CREATE TABLE todos(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        task TEXT,
        completed BOOLEAN DEFAULT 0,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )
`)