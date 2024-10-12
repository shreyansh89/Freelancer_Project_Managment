const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/Freelancer_Project");

const db = mongoose.connection;

db.once("open" , ()=> console.log("db is connected") )

module.exports = db;