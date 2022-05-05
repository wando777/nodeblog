const express = require("express");
const req = require("express/lib/request");
const app = express();
const connection = require("./database/database");

//const bodyParser = require("body-parser");
const Category = require("./categories/Category");
const categoriesController = require("./categories/categoriesController");
const Article = require("./articles/Article");
const articlesController = require("./articles/articlesController");

//View engine
app.set('view engine', 'ejs');

// statics for using css and etc
app.use(express.static('public'));

/*Body Parser - This version is deprecated, so we can use it directly from .express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());*/
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Database connection
connection
    .authenticate()
    .then(()=>{
        console.log("Database connection has been initialized")
    }).catch((error)=>{
        console.log(error);
    })

//calling controllers
app.use("/", categoriesController);
app.use("/", articlesController);


app.get("/", (req, res) => {
    res.render("index");
})

app.listen(7777, ()=>{
    console.log("The server is running.")
})