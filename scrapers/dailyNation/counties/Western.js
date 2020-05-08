const mongoose = require("mongoose");
const link = 'https://www.nation.co.ke/counties/western-region/3347786-3347786-nvg1d5/index.html'
const collectionName  = require('../../../models/allUrlsSchema.model.js');
const scrapeDailyNation = require('../../dailynation');

async function f() {
    try{
        let schema = await collectionName
        let NEWS= await mongoose.model('Links', schema);
        await scrapeDailyNation('Western', link,NEWS )

    }catch (e) {
        console.log("this error is coming from the central daily nation function", e);
    }
}

f();