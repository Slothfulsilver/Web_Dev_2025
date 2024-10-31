const express = require("express");
const app = express();
const https = require("https");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

// TODO: configure the express server

const longContent =
  "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

let posts = [];
let name;

/*app.route("/") 
  .get((req, res) => {
    const name = req.query.name;
    console.log(`Hello "${name}", from a get method`)
    res.sendFile(__dirname + "/public/html/index.html");
  })
  .post((req, res) => {
    const name = req.query.name;
    console.log(`Hello "${name}", from a post method`)
    res.sendFile(__dirname + "/public/html/index.html");
  })
*/

app.route('/')
  .get((req, res) => {
    name = req.query.name
    res.render("test", {name})
  });

app.get('/user?:name', (req, res) => {
  
});
app.listen(3000, (err) => {
  console.log("Listening on port 3000");
});
