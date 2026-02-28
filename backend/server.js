const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const helmet = require("helmet")
const http = require("http")

require("dotenv").config()
const User = require("./src/models/User")
const connectTODB = require("./src/config/db")
const { calculateXP, calculateCoins, calculateLevel } = require('./src/utils/rewards')

const authRoutes = require('./src/routes/auth')
const sessionRoutes = require('./src/routes/sessions')
const userRoutes = require('./src/routes/user')
const setupSocket = require('./src/socket')

const app = express()
const server = http.createServer(app)
const io = setupSocket(server)

app.use(helmet())
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use('/api/auth', authRoutes)
app.use('/api/sessions', sessionRoutes)
app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
    res.send("LOCKED IN API is running...")
})

const PORT = process.env.PORT || 5000

const startServer = async () => {
    try {
        await connectTODB()

        server.listen(PORT, () => {
            console.log(`server running on port ${PORT} `)
            console.log(`http://localhost:${PORT}`)
        })
    } catch (error) {
        console.error("Error starting server:", error)
    }
}

startServer()
