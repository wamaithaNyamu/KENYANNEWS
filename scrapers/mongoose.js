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

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
//----------------------------------------------------------------------------------------------
async function checkIfinDb(NEWS,newspaper, currentCounty, link) {
    console.log("checking if in db");
    await connectMongo();
    let query = {urls: link};
    let update = {
        $set: {
            newspaper: newspaper,
            county:currentCounty,
            urls: link,
        }
    };

    await sleep(1000);
    let options = { upsert: true, returnOriginal:false };

    NEWS.findOneAndUpdate(query, update, options, (err, doc)=>{
       if (err) {
           console.log("Something wrong when updating data!",err);
       }

       console.log(doc);

   });


};

module.exports = checkIfinDb