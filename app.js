const express = require("express")
const app = express()
const morgan = require("morgan");
const bodyParser = require('body-parser');
var cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
dotenv.config()

const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

mongoose.connect(
    process.env.MONGO_URI,
    { useUnifiedTopology: true, useNewUrlParser: true }
).then(() => console.log('DB Connected'))

mongoose.connection.on('error', err => {
    console.log(`DB Connection error: ${err.message}`)
});

/*
// how create your own middleware
const myOwnMiddleware = (req,res, next) => {
    console.log("Morgan Middleware Applied!!!");
    next();
}
*/

//Middleware
app.use(morgan("dev"));
//app.use(myOwnMiddleware);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: 'Unauthorized! invalid token...' });
    }
});

const port = process.env.PORT || 8094

app.listen(port, () => { console.log(`A node js Api is listening in port ${port}`) });