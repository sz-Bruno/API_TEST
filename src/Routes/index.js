const express= require('express')
const routes= express()
const userRouter= require("./users.routes")


routes.use("/users",userRouter)

module.exports= routes