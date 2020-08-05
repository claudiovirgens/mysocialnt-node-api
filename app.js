const express = require("express")
const app = express()
const morgan = require("morgan");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
dotenv.config()

const postRoutes =  require("./routes/post");
//const {getPosts} =  require("./routes/post");

mongoose.connect(
    process.env.MONGO_URI,
    {useUnifiedTopology: true, useNewUrlParser: true}
).then(()=> console.log('DB Connected'))

mongoose.connection.on('error',err => {
    console.log(`DB Connection error: ${err.message}`)
});

/*
const myOwnMiddleware = (req,res, next) => {
    console.log("Morgan Middleware Applied!!!");
    next();
}
*/

//Middleware
app.use(morgan("dev"));
//app.use(myOwnMiddleware);
app.use(bodyParser.json());
app.use(expressValidator());

app.use("/", postRoutes);

const port = process.env.PORT || 8094

app.listen(port, ()=> {console.log(`A node js Api is listening in port ${port}`)});