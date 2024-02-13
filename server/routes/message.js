import express from 'express'
import protectedRoute from '../middlewares/protectedRoute.js'
import { getMessages, sendMessage } from '../controllers/message.js'

const router = express.Router()

router.get("/:id", protectedRoute, getMessages)
router.post("/send/:id", protectedRoute, sendMessage)

export default router