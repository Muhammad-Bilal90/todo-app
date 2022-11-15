const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
        value: String,
});

const TodoModel = mongoose.model("todo", TodoSchema);

module.exports = TodoModel;