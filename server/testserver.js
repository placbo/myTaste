const express = require("express");
const routes = require("./routes");
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/mytaste', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("mongodb connected");
});

const app = express();

app.listen(3030, ()=> {
    console.log("Test-application running om port 3030")
});

app.use(routes);



