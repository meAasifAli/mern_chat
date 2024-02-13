import express from 'express'
import protectedRoute from '../middlewares/protectedRoute.js'
import { getOtherUsers } from '../controllers/user.js'

const router = express.Router()


router.get("/", protectedRoute, getOtherUsers)


export default router