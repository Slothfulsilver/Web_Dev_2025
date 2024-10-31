const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
var shopping = ["apples", "eggs", "coffee"];

app.route('/')
  .get((req, res) => {
    res.render("home")
  });
  
app.post('/bmi', (req, res) => {
  var w = req.body.weight;
  var h = req.body.height;
  var bmi = (w / (h*h));
  console.log(bmi);
  res.send(`<p>Your BMI is ${bmi}<p/>`);
});

app.listen(3000);