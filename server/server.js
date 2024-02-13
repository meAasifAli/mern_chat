import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { v2 as cloudinary } from 'cloudinary'
import cookieParser from 'cookie-parser'
import connectWithDB from './config/db.js'
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/user.js"
import messageRoutes from './routes/message.js'
import { app, server } from './socket/socket.js'


dotenv.config()




app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "50mb", extended: true }))
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use(cookieParser())


//CLOUDINARY CONFIG

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

server.listen(process.env.PORT, () => {
    connectWithDB()
    console.log(`Server is running on port ${process.env.PORT}`)
})

//routes

app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/messages", messageRoutes)





