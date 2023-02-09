const express= require('express')

const userRouter= express()
const UserController= require('../Controller/userController')
const AppError = require('../Utils/AppError')
const userController= new UserController

const MiddleWare=(request,response,next)=>{
    const {isAdmin}= request.body
    
    if(!isAdmin){
       throw new AppError('Você não tem a permissão de Administrador')
       
    }
    next()

  
}

userRouter.post('/',MiddleWare, userController.create )
userRouter.put('/:id',MiddleWare, userController.update )

module.exports= userRouter