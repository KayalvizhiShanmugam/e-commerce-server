const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
//const connectDB = require("./config/db")
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose');

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static("public"));

// connect to the mongodb database
/* connectDB() */
mongoose.set('strictQuery', false);

const connectionString = 'mongodb+srv://Kayalvizhi:zEhG94Ca1jgLI7S5@cluster0.fo1f9ik.mongodb.net/items?retryWrites=true&w=majority';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});


app.use('/api/items', require("./routes/items"))
app.use('/api/payment', cors(), require("./routes/payment"))

app.listen(PORT, console.log("Server is running on port ", PORT))