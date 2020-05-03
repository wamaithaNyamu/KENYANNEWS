const dbConfig = require('../config/database.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//----------------------------------------------------------------------------------------------
//creates a connection to Mongo db
async function connectMongo(){
    const connector = mongoose.connect(dbConfig.url,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
    return connector;
}
async function getNameOfSchema(name){
    return NEWS
}

//----------------------------------------------------------------------------------------------
async function checkIfinDb(NEWS, link) {
    console.log("checking if in db");
    await connectMongo();
    let query = {urls: link};
    let update = {
        $set: {
            urls: link,
        }
    };
    let options = { upsert: true, returnOriginal:false };

    NEWS.findOneAndUpdate(query, update, options, (err, doc)=>{
       if (err) {
           console.log("Something wrong when updating data!",err);
       }

       console.log(doc);
   });


};

module.exports = checkIfinDb