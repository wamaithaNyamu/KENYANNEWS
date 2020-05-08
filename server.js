const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.set('views', './views');
if (app.settings.env === 'development') process.env.NODE_ENV = 'development';

//requite the configuration variables from the .env file.
app.use(express.static(__dirname + "/public", {maxAge: 3456700000}));
// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});



require('./routes/news.routes')(app);
// listen for requests
app.listen(process.env.PORT || 8000, () => {
    console.log("Server is listening on port 3000");
});