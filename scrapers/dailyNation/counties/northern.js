const mongoose = require("mongoose");
const link = 'https://www.nation.co.ke/counties/northern-region/3347734-3347734-155vfigz/index.html'
const collectionName  = require('../../../models/allUrlsSchema.model.js');
const scrapeDailyNation = require('../../dailynation');

async function f() {
    try{
        let schema = await collectionName
        let NEWS= await mongoose.model('Links', schema);
        await scrapeDailyNation('Northern', link,NEWS )

    }catch (e) {
        console.log("this error is coming from the central daily nation function", e);
    }
}

f();