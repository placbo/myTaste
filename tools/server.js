const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fireBaseRoute = require('./firebase.router');
const config = require('./config');
const cors = require('cors');

app.use(cors());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/firebase', fireBaseRoute);
app.listen(config.port, () => console.log(`MyTaste server running on port ${config.port}`));