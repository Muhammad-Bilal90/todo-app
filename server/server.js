const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const Todo = require("./model/todo");
const app = express();
const PORT = 5000;
const db = process.env.MONGO_URL;

app.use(express.json());
app.use(cors());

// let todos = [
//     {
//         id: Math.floor(Math.random() * 100),
//         value: "Hello",
//     },
//     {
//         id: Math.floor(Math.random() * 100),
//         value: "World",
//     },
//     {
//         id: Math.floor(Math.random() * 100),
//         value: "Playing",
//     },
// ];

app.get("/", async function(req,res){
    const todos = await Todo.find();
    res.json(todos);
});


app.post("/addTodo", async function(req,res){
    const newTodo = new Todo({
        value: req.body.value,
    });

    const createTodo = await newTodo.save();
    res.json(createTodo);
});

app.delete("/delete/:id", async function(req,res){
    let {id} = req.params;
    const deleteTodo = await Todo.findByIdAndDelete(id)
    res.json(deleteTodo);
});

app.put("/update/:id", async function(req,res){
    let {id} = req.params;
    let body = req.body.value;
    const updateTodo = await Todo.findByIdAndUpdate(id, { value: body}, { returnDocument: 'after' });
    res.json(updateTodo);
});

mongoose.connect(db)
.then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT);
    console.log(`Running aap on ${PORT}`);
});

module.exports = app;