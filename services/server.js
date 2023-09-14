const express = require("express")
const cors = require("cors")
const app = express()
const {authRouter} = require("./Router/Auth")
const {postsRouter} = require("./Router/Post")
const { commentsRouter } = require("./Router/Comments")
const PORT = 8080
app.set("view engine" , "pug")

app.use(cors())
app.use(express.json())

app.use("/Auth",authRouter)
app.use("/posts" , postsRouter)
app.use("/comments",commentsRouter)
app.listen(PORT , ()=>{
    console.log("server is runing on ",PORT)
})
