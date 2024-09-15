import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDB from './connections/db.js'
import userRoute from './routes/user.routes.js' 

// initialize dotenv to import environment variables
dotenv.config()

const PORT = process.env.PORT || 5000
const CORS_OPTIONS = {
    origin:process.env.CLIENT_URL,
    credentials:true
}

const app = express();

// middlewares
app.use(express.json())  // When we send request data then it will come into json format
app.use(express.urlencoded({extended:true}))  //Allows for rich objects and arrays to be encoded in the URL-encoded format. If set to false, it only allows strings and arrays.
app.use(cookieParser())
app.use(cors(CORS_OPTIONS)) 
 

// API's
app.use('/api/auth', userRoute)

 
// listning on PORT
app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server is running on Port: ${PORT}`);
})