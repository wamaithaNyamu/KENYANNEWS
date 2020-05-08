const mongoose = require("mongoose");
const link = 'https://www.standardmedia.co.ke/category/15/north-eastern';
const collectionName  = require('../../../models/allUrlsSchema.model.js');
const scrapeStandard = require('../../standard');

async function f() {
    try{
        let schema = await collectionName
        let NEWS= await mongoose.model('Links', schema);
        await scrapeStandard('Northern', link,NEWS )

    }catch (e) {
        console.log("this error is coming from the central daily nation function", e);
    }
}

f();