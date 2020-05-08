const mongoose = require("mongoose");

//schema

const allUrlsSchema = new mongoose.Schema({
    newspaper: {
        type: String,

    },
    county: {
        type: String,

    },
     urls : {
         type: String,
         unique : true,
     }
});

module.exports = allUrlsSchema

