const mongoose = require('mongoose');
const db = process.env.MONGO_URL;

const connectDB = async () => {
    try{
        await mongoose.connect("mongodb+srv://Muhammad-Bilal90:mongodbTodo@cluster0.m1nlrnu.mongodb.net/?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB is connected");
    } catch(err) {
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;