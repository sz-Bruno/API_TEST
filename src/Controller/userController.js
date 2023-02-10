
const {hash, compare}=require ('bcrypt')
const AppError = require("../Utils/AppError")
const knex = require("../Database/knex")
class UserController{

    async create (request,response){
         const {name,email,password}= request.body

         const UserWhithSameEmail= await knex('users').where({email})
         if(UserWhithSameEmail.length===1){
            throw new  AppError("Este email já está em uso")
          
         }else{
          const hashedPassword= await hash(password,8)
            await knex("users").insert({name,email,password:hashedPassword})
            response.status(201).json({
              message:`Usuário (a) ${name} cadastrado com sucesso!`})
    
         }
        
    }
    async update(request,response){
        const {name,email,oldpassword,password}= request.body
        const {id}= request.params
        
        const User= await knex("users").where({id})
        const UserWhithSameEmail= await knex("users").where({email})

        if(User.length===0){
            throw new AppError('Usuário não encontrado')
        }
        
        if( UserWhithSameEmail[0] && UserWhithSameEmail[0].id !== User[0].id ){
            throw new AppError('Este e-mail já está cadastrado')
        }
        
        if(password && !oldpassword){
          throw new AppError('Informe a senha antiga')
        }
        if(password && oldpassword){
           const CheckOldPassword= await compare(oldpassword,User[0].password)

           if(!CheckOldPassword){
            throw new AppError('Senha incorreta')
           }else{
            User[0].name= name ?? User[0].name
            User[0].email=email ?? User[0].email
            const hashedPassword=await hash(password,8)
            User[0].password=hashedPassword ?? User[0].password
            
            await knex('users').update({name:User[0].name, email:User[0].email, password:User[0].password}).where({id})
            response.status(200).json({message:`Dados do(a) usuário(a) ${name} atualizados`})
           }
        }
       
              
        
            

        }
        

       
    }



module.exports= UserController