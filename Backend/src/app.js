import express from 'express'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import cors from 'cors'


const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
// app.use(cors(
//     {
//         origin : 'http://localhost:5174' ,
//         credentials : true,
//         methods :["POST" , "GET" , "PUT" , "DELETE"]
//     }
// ))


import authRouter from './routes/auth.routes.js'

app.use('/api/auth' , authRouter)


export default app