const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve static files
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// In-memory storage for blog posts
let posts = [];

// Home route
app.get("/", (req, res) => {
    res.render("index", { posts });
});

// Route to handle new post submission
app.post("/add", (req, res) => {
    const { title, content } = req.body;
    if (title && content) {
        posts.push({ title, content, date: new Date().toLocaleString() });
    }
    res.redirect("/");
});

// Start the server
app.listen(PORT, () => {
    console.log(` Server running at http://localhost:${PORT} `);
});

// Serve CSS
app.use("/css", express.static(path.join(__dirname, "public/css")));