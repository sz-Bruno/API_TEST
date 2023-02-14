const {Router}= require('express')
const sessionRouter= Router()
const SessionsController= require('../Controller/sessionsController')
const sessionsController= new SessionsController


sessionRouter.post('/',sessionsController.create)



module.exports= sessionRouter