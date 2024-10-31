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
let logIn = null;

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
    res.render("test", {user: logIn, posts: posts});
  });

app.post('/login', (req, res) => {
  const user = req.body.user;
  if (user) {
    logIn = user;
    res.redirect('/home');
  } else {
    res.redirect('/');
  }

app.get('/home', (req, res) => {
  if (logIn) {
    res.render('home', { user: logIn, posts: posts });
  } else {
    res.redirect('/');
  }
});

app.post('/post', (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  if (content && title){
    const newPost = {
      id: posts.length + 1,
      title: title,
      content: content
    }
    posts.push(newPost);
  }
  res.redirect('/home')
});

});
app.listen(3000, (err) => {
  console.log("Listening on port 3000");
});
