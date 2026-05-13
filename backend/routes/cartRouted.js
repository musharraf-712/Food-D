import express from 'express'
import { add, get, remove } from '../controllers/cartController.js'
import authMiddleware from '../middleware/auth.js'

const cartRouter = express.Router()

cartRouter.post('/add',authMiddleware,add)
cartRouter.post('/remove',authMiddleware,remove)
cartRouter.post('/get',authMiddleware,get)

export default cartRouter