const {Router}= require('express')


const UserController= require('../Controller/userController')
const AuthMiddleware= require('.././Middlewares/EnsureAuthenticated')
const userRouter= Router()
const userController= new UserController




userRouter.post('/', userController.create )
userRouter.put('/',AuthMiddleware, userController.update )

module.exports= userRouter