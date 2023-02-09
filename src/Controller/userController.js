
const {hash}=require ('bcrypt')
const AppError = require("../Utils/AppError")
const knex = require("../Database/knex")
class UserController{

    async create (request,response){
         const {name,email,password}= request.body
         const UserWhithSameEmail= await knex("users").where({email})
         if(UserWhithSameEmail){
            throw new AppError("Este email já está em uso")
         }
         const hashedPassword= await hash(password,8)
          await knex("users").insert({name:name,email:email,password:hashedPassword})
          response.status(201).json({
            message:`Usuário (a) ${name} cadastrado com sucesso!`

        }
        
        )
    }
    async update(request,response){
        const {name,email,password}= request.body
        const {id}= request.params
        
        
        const User= await knex("users").where({id})
        if(User.length==0){
            throw new AppError('Usuário não encontrado')
        }
        
        const hashedPassword=await hash(password,8)
        
        User.name= name ?? User.name
        User.email=email ?? User.email
        User.password=hashedPassword ?? User.password
        await knex('users').update({name:User.name, email:User.email, password:User.password}).where({id})
        response.status(200).json({message:`Dados do usuário(a) ${name} atualizados`})
    }

}

module.exports= UserController