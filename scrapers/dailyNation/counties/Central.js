const mongoose = require("mongoose");
const link = 'https://www.nation.co.ke/counties/mtkenya/3317830-3317830-7p8g5w/index.html'
const collectionName  = require('../../../models/allUrlsSchema.model.js');
const scrapeDailyNation = require('../../dailynation');

async function f() {
 try{
     let schema = await collectionName
     let NEWS= await mongoose.model('Links', schema);
     await scrapeDailyNation('Central', link,NEWS )

 }catch (e) {
     console.log("this error is coming from the central daily nation function", e);
 }
}

f();