require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

var user = process.env.DB_USER;
var pass = process.env.DB_PASS;
var db = process.env.DB;

//Local install mongo
//const mongoURL = 'mongodb://${user}:${pass}@127.'
//Connect to Atlas
const mongoURL = `mongodb+srv://${user}:${pass}@cluster0.s3ze2.mongodb.net/${db}?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true});

const bdaySchema = 
  new mongoose.Schema({
    name: String,
    lname: String,
    dob: Date
  });
bdaySchema.set("strictQuery", true);

const BdayPerson = mongoose.model("BirthDays", bdaySchema);

var friends = [];

app.use("/", async (req, res, next) => {
  if (friends.length == 0) {
    friends = await BdayPerson.find({}).exec();
  }
  next();
});

app.route('/')
  .get((req, res) => {
    res.render("home", {name: "Silver" , friends});
  })
  .post((req, res) => {
    res.send();
  });

app.post('/add', (req, res) => {
    var name = req.body.name;
    var lname = req.body.lname;
    var dob = req.body.dob;
    const bday = new BdayPerson({
      name,
      lname,
      dob
    });
    bday.save();
    console.log(name + " " + lname + " " + dob);
    friends.push(bday);
    res.redirect("/")
});

app.listen(3000);