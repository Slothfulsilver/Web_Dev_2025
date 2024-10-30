const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

var shopping = ["apples", "eggs", "coffee"];

app.route('/')
  .get((req, res) => {
    var students = [
    {
      id: 10,
      name: "Juan",
      lastname: "Perez",
      yob: 2001
    },
    {
      id: 11,
      name: "Pablo",
      lastname: "Lopez",
      yob: 2001
    },
    {
      id: 13,
      name: "Sophia",
      lastname: "Gomez",
      yob: 2001
    }
  ]
    
    /*var params = {
      name: "Silver",
      lastname: "Garcia",
      shopping,
      students
    }*/
    res.render("home", {  name: "Silver",
      lastname: "Garcia",
      shopping,
      students
    });
  })
  .post((req, res) => {
    var w = req.body.weight;
    var h = req.body.height;
    res.send("Your BMI is " + (w / (h*h)));
  });

app.listen(3000);