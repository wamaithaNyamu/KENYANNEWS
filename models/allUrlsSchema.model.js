const mongoose = require("mongoose");

//schema
const allUrlsSchema = new mongoose.Schema({
     urls : {
         type: String,
         unique : true,
     }
});

module.exports = mongoose.model('allurls',allUrlsSchema );

