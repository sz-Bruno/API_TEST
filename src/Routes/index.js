const {Router}= require('express')
const routes= Router()
const userRouter= require("./users.routes")
const sessionsRouter= require('./sessions.routes')

routes.use("/users",userRouter)
routes.use("/sessions",sessionsRouter)

module.exports= routes