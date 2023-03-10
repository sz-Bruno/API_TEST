require('express-async-errors')
const express= require('express')
const app= express()
const routes= require('./Routes/index')
const database= require('./Database/sqlite')
const AppError = require('./Utils/AppError')
app.use(express.json())
app.use(routes)

database()
app.use((error,request,response,next)=>{
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: 'error',
            message: error.message
        })
    }
    console.error(error)
    return response.status(500).json({
        status:'error',
        message:'Internal server error'
    })
})
const PORT= 3333

app.listen(PORT,()=>console.log('Server is alive!'))

