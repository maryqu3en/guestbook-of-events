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

Router.get("/allpost" , (req , res)=>{
    return res.status(200).json(data)
})

Router.post( "/add/:id" , (req , res)=>{
    const {id} = req.params
    const {text , image} = req.body
    const postId = Math.floor(Math.random() * 10000)
    const findUserPost = data.users.findIndex(accountIndex => accountIndex.id == id)
    if (findUserPost != -1) {
        data.posts.push({id , text , image , postId})
        fs.writeFileSync(path.resolve(__dirname , "../model/data.json") , JSON.stringify(data))
        return res.status(200).json(data)
    } else {
        return res.status(404).json({message : "id not found"})
    }
})

Router.put("/update/:id" , (req , res)=>{
    const {id} = req.params
    const {text , image} = req.body
    const findPostIndex = data.posts.findIndex(postId => postId.postId == id)
    if (findPostIndex != -1) {
        data.posts[findPostIndex].text = text || data.posts[findPostIndex].text
        data.posts[findPostIndex].image = image || data.posts[findPostIndex].image
        fs.writeFileSync(path.resolve(__dirname , "../model/data.json") , JSON.stringify(data))
        return res.status(200).json(data)
    }else {
        return res.status(404).json({message : "post not find"})
    }
})

Router.delete("/delete/:id" , (req , res) => {
    const {id} = req.params
    const findPostIndex = data.posts.findIndex(post => post.id == id)
    if (findPostIndex != -1) {
        data.posts.splice(findPostIndex , 1)
        fs.writeFileSync(path.resolve(__dirname , "../model/data.json") , JSON.stringify(data))
        return res.status(200).json(data)
    }else {
        return res.status(404).json({message : "post not found"})
    }
})

module.exports = {postsRouter : Router}