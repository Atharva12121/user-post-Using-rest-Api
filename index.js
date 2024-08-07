const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.set("views engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/public")));

app.listen(port, () => {
    console.log(`server will start port ${port}`);
});
let posts = [{
        id: uuidv4(),
        username: "Atharva",
        Content: "I am sonar",
    },
    {
        id: uuidv4(),
        username: "Karemore",
        Content: "I am try to do something new",
    },
    {
        id: uuidv4(),
        username: "aaaa",
        Content: "nothing matter",
    },
];
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});
app.post("/posts", (req, res) => {
    console.log(req.body);
    let { username, Content } = req.body;
    id = uuidv4();
    posts.push({ id, username, Content })
    res.redirect("/posts");
});
app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("show.ejs", { post });

});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.Content;
    post.Content = newContent;
    let post = posts.find((p) => id == p.id);
    newContent = req.body.Content;
    res.redirect("/posts");
});
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => p.id == id);
    res.render("edit.ejs", { post });
});
app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");

});
