const express = require("express")
const cors = require("cors")
const fs = require("fs")
const path = require("path")
const Router = express.Router()
const bodyParser = require("body-parser")
let data = JSON.parse(fs.readFileSync(path.resolve(__dirname , "../model/data.json")))


Router.use(cors())
Router.use(bodyParser.urlencoded({extended : true}))
Router.use(express.urlencoded({extended : true}))

Router.post("/create" ,  (req , res)=>{ 
    const {email , password , name , image} = req.body
    const id = Math.floor(Math.random() * 100000) ;
    const dataExist = data.users.findIndex((data)=> data.email == email)
    if (dataExist != -1) {
      return res.status(404).json({error : "This account already exists."})
    } else {
      data.users.push({id , email , password , name , image , isLoged : false})
      fs.writeFileSync(path.resolve(__dirname , "../model/data.json") , JSON.stringify(data))
      return res.status(200).json(data)
    }
})

Router.post("/check",(req , res)=>{
    const {email , password} = req.body
    const accountIndex = data.users.findIndex(userEmail=>userEmail.email === email)
    if (accountIndex != -1) {
        if (data.users[accountIndex].password === password) {
            for (let index = 0; index < data.users.length; index++) {
                data.users[index].isLoged = false
            }
            data.users[accountIndex].isLoged = true
            fs.writeFileSync(path.resolve(__dirname , "../model/data.json") , JSON.stringify(data))
            return res.status(200).json({account : data.users[accountIndex]})
        }else {
            return res.status(404).json({message : "Incorrect password"})
        }
    }else {
        return res.status(404).json({message : "This account doesn't exist."})
    }
})

module.exports = {authRouter : Router}