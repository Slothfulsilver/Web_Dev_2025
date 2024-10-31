const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

let names = [];
let tasks = [];

app.route('/')
    .get((req, res) => {
    res.render("index", {names, tasks});
});

app.get('/greet',(req, res) => {
        const name = req.query.name;
        if (name && !names.includes(name)) {
            names.push(name); 
        }
        console.log(`Hello ${name}`); 
        res.redirect('/'); 
    })

app.get('/wazzup', (req, res) => {
    const name = req.query.name;
    res.render('wazzup', { name });
});
    
app.route('/task')
    .get((req, res) => {
        res.json(tasks);
    })
    .post((req, res) => {
        const task = req.body.toDo;
        tasks.push(task);
        console.log(tasks)
        res.redirect('/');
    });

app.post('/task/delete/:index', (req, res) => {
    const index = req.params.index;
    tasks.splice(index, 1);
    res.redirect('/');
});

app.listen(3000, ()  => {
    console.log("App listening on port 3000")
})