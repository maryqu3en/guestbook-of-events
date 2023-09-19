const express = require("express")
const app = express()
const {authRouter} = require("./Router/Auth")
const {postsRouter} = require("./Router/Post")
const { commentsRouter } = require("./Router/Comments")
const PORT = 8080
app.set("view engine" , "pug")

app.use(express.json())

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('landingPage');
  });

app.get("/login", (req, res) => {
  return res.render("login");
});

app.get("/register", (req, res) => {
  return res.render("register");
});
app.use("/Auth",authRouter)
app.use("/posts" , postsRouter)
app.use("/comments",commentsRouter)

app.listen(PORT , ()=>{
    console.log(`server is runing on: http://localhost:${PORT}`)
})
