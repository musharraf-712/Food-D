import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoutes.js'
import userRouter from './routes/userRoutes.js'
import 'dotenv/config'
import cartRouter from './routes/cartRouted.js'
import authMiddleware from './middleware/auth.js'
import orderRouter from './routes/orderRouter.js'

//app config
const app = express()
const port = process.env.PORT || 4000

//middleware
app.use(express.json())
app.use(cors())

//db connecction
connectDB()

app.get('/',(req,res)=>{
    res.send('API Working')
})

//api endpoins
app.use("/api/food",foodRouter)
app.use('/images',express.static('uploads'))
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)



app.listen(port,()=>console.log(`Server start on http://localhost:${port}`))


