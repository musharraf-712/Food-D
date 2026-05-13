import express from 'express'
import multer from 'multer'
import { addFood, listFood, removeFood} from '../controllers/foodController.js'


const foodRouter = express.Router()

//Image storage engine
const storae = multer.diskStorage({
    destination:"uploads",
    filename(req,file,callback){
        return callback(null,`${Date.now()} ${file.originalname}`)
    }
})
const upload = multer({storage:storae})


  
foodRouter.post('/add',upload.single("image"),addFood)
foodRouter.get('/list',listFood)
foodRouter.post('/remove',removeFood)

export default foodRouter