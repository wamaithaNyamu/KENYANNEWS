const mongoose = require("mongoose");
const link = 'https://www.nation.co.ke/counties/mtkenya/3317830-3317830-7p8g5w/index.html'
const collectionName  = require('../../../models/allUrlsSchema.model.js');
const scrapeDailyNation = require('../../dailynation');
const northRiftRegion = 'https://www.nation.co.ke/counties/north-rift/3347778-3347778-aga2m3z/index.html'
const sourthRiftRegion = 'https://www.nation.co.ke/counties/south-rift/3347782-3347782-rtpd5y/index.html'
const rift = [northRiftRegion,sourthRiftRegion]
async function f() {
    try{
        let schema = await collectionName
        let NEWS= await mongoose.model('Links', schema);
        for(let link of rift) {
            await scrapeDailyNation('Riftvalley', link, NEWS)
        }
    }catch (e) {
        console.log("this error is coming from the central daily nation function", e);
    }
}

f();