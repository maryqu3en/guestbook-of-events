const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const Router = express.Router();
const bodyParser = require("body-parser");

let data = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../model/data.json"))
);

Router.use(cors());
Router.use(bodyParser.urlencoded({ extended: true }));
Router.use(express.urlencoded({ extended: true }));

const userLoged = data.users.find((userLoged) => userLoged.isLoged == true);

Router.get("/allpost", (req, res) => {
  return res.render("events", {
    posts: data.posts,
    userInformation: userLoged,
  });
});

Router.get("/myEvents/:id", (req, res) => {
  const { id } = req.params;
  const findPosts = data.posts.filter((userPost) => userPost.id == id);
  console.log(data.posts);
  if (findPosts != -1) {
    return res.render("myEvents", {
      posts: findPosts,
      userInformation: userLoged,
    });
  } else {
    return res.status(404).json({ message: "user not found" });
  }
});
Router.get("/addEvent", (req, res) => {
  return res.render("createEvent", {
    posts: data.posts,
    users: data.users,
    userInformation: userLoged,
  });
});

Router.get("/updateEvent", (req, res) => {
  return res.render("updateEvent", {
    posts: data.posts,
    users: data.users,
    userInformation: userLoged,
  });
});

Router.post("/add/:id", (req, res) => {
  const { id } = req.params;
  const { text, image } = req.body;
  const postId = Math.floor(Math.random() * 10000);
  const findUserPost = data.users.findIndex(
    (accountIndex) => accountIndex.id == id
  );
  const userName = userLoged.name;
  const userImage = userLoged.image;
  const comments = [];
  if (findUserPost != -1) {
    data.posts.push({ id, text, image, postId, userImage, userName, comments });
    fs.writeFileSync(
      path.resolve(__dirname, "../model/data.json"),
      JSON.stringify(data, null, 2)
    );
    console.log("event created succefully");
    res.redirect(`/posts/allpost`);
  } else {
    return res.status(404).json({ message: "id not found" });
  }
});

Router.get("/updateEvent/:id/:postId", (req, res) => {
  const { id, postId } = req.params;
  const post = data.posts.find((post) => post.postId == postId);
  return res.render("updateEvent", {
    post,
    userInformation: userLoged,
  });
});

//  POST request to update a post
Router.post("/updateEvent/:id/:postId", (req, res) => {
  const { id, postId } = req.params;
  const { text, image } = req.body;

  const postIndex = data.posts.findIndex((post) => post.postId == postId);

  if (postIndex === -1) {
    return res.status(404).json({ message: "Post not found" });
  }

  data.posts[postIndex].text = text;
  data.posts[postIndex].image = image;

  fs.writeFileSync(
    path.resolve(__dirname, "../model/data.json"),
    JSON.stringify(data, null, 2)
  );

  res.redirect(`/posts/myEvents/${id}`);
});

// Handle DELETE request to delete a post
Router.delete("/delete/:id/:postId", (req, res) => {
  const { id, postId } = req.params;

  // Find the index of the post to delete
  const postIndex = data.posts.findIndex((post) => post.postId == postId);

  if (postIndex === -1) {
    return res.status(404).json({ message: "Post not found" });
  }
  data.posts.splice(postIndex, 1);
  fs.writeFileSync(
    path.resolve(__dirname, "../model/data.json"),
    JSON.stringify(data, null, 2)
  );

  res.redirect(`/posts/myEvents/${id}`);
});


module.exports = { postsRouter: Router };
