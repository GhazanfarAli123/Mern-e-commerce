import express from 'express'
import dotenv from "dotenv"
import morgan from 'morgan'
import connectDb from './config/db.js'
import authRouter from "./routes/authRouter.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cors from "cors"


dotenv.config()

connectDb()

const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

app.use("/api/v1/auth",authRouter)
app.use("/api/v1/category",categoryRoutes)
app.use("/api/v1/product",productRoutes)

app.get('/' , (req,res)=>{
    res.send("hallo world")
})


const PORT = process.env.PORT || 1000

app.listen(PORT,()=>{
    console.log("server is running on " + PORT)
})