import path from 'path';
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import colors from 'colors'
import cors from 'cors'
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
import userRoutes from './routes/user&authRoutes.js'
import postRoutes from './routes/postRoute.js' 
import categoryRoutes from './routes/categoryRoutes.js' 
import uploadRoutes from './routes/uploadRoutes.js' 
const __dirname = path.resolve(path.dirname(''));
dotenv.config({path:__dirname + '/.env'})

connectDB()

const app = express()

app.use(express.json())
app.use(cors())

// app.use(express.static(__dirname + '/public'))
app.use("/public", express.static(path.join(__dirname, "/public")))

app.get('/', (req, res)=>{
    res.send('this is the home page')
})
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
// routing
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/upload', uploadRoutes)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/client/build')))

    app.get('*', (req, res)=>
     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}
// "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"

// error middleware
app.use(notFound)
app.use(errorHandler)

const PORT = 5000

app.listen(PORT,console.log( `app is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.yellow.bold))