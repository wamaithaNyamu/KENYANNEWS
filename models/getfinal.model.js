const mongoose = require("mongoose");

//schema
const nlpDataSchema = new mongoose.Schema({
    url : {
        type: String,

    },
    summary : {
        type: String,

    },
    keywords : {
        type: String,

    },
    sentiment : {
        type: String,

    },
    fullText : {
        type: String,

    }
});

module.exports = mongoose.model('nlpData',nlpDataSchema, 'nlpData' );

