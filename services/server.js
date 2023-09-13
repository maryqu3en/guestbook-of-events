const express = require("express")
const cors = require("cors")
const app = express()
const {authRouter} = require("./Router/Auth")
const {postsRouter} = require("./Router/Post")
const PORT = 8080
app.set("view engine" , "pug")
app.use(express.static('public'));
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.render('landingPage');
  });
  
app.use("/Auth",authRouter)
app.use("/posts" , postsRouter)
app.listen(PORT , ()=>{
    console.log("server is running on ",PORT)
})
