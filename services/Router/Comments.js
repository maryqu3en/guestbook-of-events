const express = require("express")
const cors = require("cors")
const Router = express.Router()
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser")

let data = JSON.parse(fs.readFileSync(path.resolve(__dirname,"../model/data.json")))

Router.use(cors())
Router.use(bodyParser.urlencoded({extended : true}))
Router.use(express.urlencoded({extended : true}))

Router.get('/showcomments', (req,res) => {
    return res.status(200).json({allComment : data.comments})
})
 
Router.post("/add/:postId", (req,res) => {
    const { postId } = req.params
    const {comment} = req.body
    const commentId = Math.floor(Math.random() * 10000)
    const findPostComment = data.posts.findIndex(commentIndex => commentIndex.postId == postId)
    if (findPostComment != -1) {
        if (data.posts[findPostComment].comments) 
        data.posts[findPostComment].comments.push({commentId , comment}) 
        else
        data.posts[findPostComment].comments = [{commentId , comment}]

        fs.writeFileSync(path.resolve(__dirname , "../model/data.json") , JSON.stringify(data))
        return res.status(200).json(data)
    } else {
        return res.status(404).json({message : "Post not found"})
    }    
})

Router.put("/update/:postId/:commentId", (req,res) => {
    const { postId , commentId} = req.params
    const { comment } = req.body
    const findPost = data.posts.findIndex(post=>post.postId==postId)
    const findPostComment = data.posts[findPost].comments.findIndex(commentIndex => commentIndex.commentId == commentId)
    if ( findPostComment != -1 ){
        data.posts[findPost].comments[findPostComment].comment = comment || data.posts[findPost].comments[findPostComment].comment
        fs.writeFileSync(path.resolve(__dirname , "../model/data.json") , JSON.stringify(data))
        return res.status(200).json(data)
    }else{
        return res.status(404).json({ message : "comment not found" })
    }  
})

Router.delete("/delete/:postId/:commentId", (req,res) => {
    const { commentId , postId} = req.params
    const findPost = data.posts.findIndex(postIndex => postIndex.postId == postId)
    const findComment = data.posts[findPost].comments.findIndex(commentIndex => commentIndex.commentId == commentId)
    if ( findComment != -1 ) {
        data.posts[findPost].comments.splice(findComment,1)
        fs.writeFileSync(path.resolve(__dirname , "../model/data.json") , JSON.stringify(data))
        return res.status(200).json(data)
    }else {
        return res.status(404).json({ message : "comment not found" })
    }
})

module.exports = {commentsRouter : Router}
