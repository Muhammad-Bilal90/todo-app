const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const connectDB = require("./config/db");
const app = express();
const PORT = 5000;
var cors = require("cors");
// const todo = require("./routes/todo"); 
const Todo = require("./model/todo");
connectDB();

app.use(express.json({ extended: false }));
app.use(cors());

let todos = [
    {
        id: Math.floor(Math.random() * 100),
        value: "Hello",
    },
    {
        id: Math.floor(Math.random() * 100),
        value: "World",
    },
    {
        id: Math.floor(Math.random() * 100),
        value: "Playing",
    },
];

app.get("/", function(req,res){
    res.send(todos);
});

app.post("/addTodo", async function(req,res){
    // console.log(req.body);
    // todos.push(req.body);
    // console.log(todos);
    
    const newTodo = new Todo({
        value: req.body.value,
    });

    const createTodo = await newTodo.save();
    res.json(createTodo);
});

app.delete("/delete/:id", function(req,res){
    let {id} = req.params;
    // console.log(id);
    todos = todos.filter(todo => String(todo.id) !== id);
    // console.log("DELETE: ", deletedTodo);
    // console.log(todos);
    res.send(todos);
});




app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
});

module.exports = app;