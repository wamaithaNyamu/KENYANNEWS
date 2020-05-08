const mongoose = require("mongoose");
const link = 'https://www.nation.co.ke/counties/nyanza-kisii-region/3347796-3347796-unywdg/index.html'
const collectionName  = require('../../../models/allUrlsSchema.model.js');
const scrapeDailyNation = require('../../dailynation');

async function f() {
    try{
        let schema = await collectionName
        let NEWS= await mongoose.model('Links', schema);
        await scrapeDailyNation('Nyanza', link,NEWS )

    }catch (e) {
        console.log("this error is coming from the central daily nation function", e);
    }
}

f();