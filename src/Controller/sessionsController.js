const AppError= require('.././Utils/AppError')
const knex= require('../Database/knex')
const {compare} =require("bcryptjs")

const {sign}= require('jsonwebtoken')
const Auth = require('../Configs/Auth')
class SessionsController{

     async create(request,response){
     const {email,password}= request.body
     
     const User =await knex('users').where({email})

     if(!User){
        throw new AppError('E-mail e/ou senha inválidos',401)
     }
     
        const DatabasePassword= await User[0].password
         const PasswordMatch= await compare(password,DatabasePassword)
     

         if(!PasswordMatch){
            throw new AppError('E-mail e/ou senha inválidos',401)
            
         }
         
         const {secret,expiresIn}= Auth.jwt
         const token= sign({},secret,{
            subject:String(User[0].id),
            expiresIn
         })
            return response.json({User,token})
         
    

    }
}

module.exports= SessionsController