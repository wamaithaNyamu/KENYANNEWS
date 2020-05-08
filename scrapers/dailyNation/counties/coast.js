const mongoose = require("mongoose");
const link = 'https://www.nation.co.ke/counties/coast/3347800-3347800-ey6rn8z/index.html'
const collectionName  = require('../../../models/allUrlsSchema.model.js');
const scrapeDailyNation = require('../../dailynation');

async function f() {
    try{
        let schema = await collectionName
        let NEWS= await mongoose.model('Links', schema);
        await scrapeDailyNation('Coast', link,NEWS )

    }catch (e) {
        console.log("this error is coming from the Coast daily nation function", e);
    }
}

f();