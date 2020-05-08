const { getBrowser, interceptRequests} = require('../../scraper');
const checkIfInDb  = require('../../mongoose');
const mongoose = require("mongoose");
const link = 'https://www.nation.co.ke/counties/nairobi/1954174-1954174-swx4nez/index.html'
const collectionName  = require('../../../models/allUrlsSchema.model.js');
let NEWS=  mongoose.model('Links', collectionName);
async function scrapeDailyNation() {
    try{
        const browser = await getBrowser();
        const page = await browser.newPage();
        // await interceptRequests(page);
        let currentCounty = 'Nairobi';
        let newspaper = 'Daily Nation';
        console.log("this is a link", link);
        await page.goto(link,{ timeout: 180000});
        // console.log(links)
        let allLinksInPage =[];
        const linksOne = await page.$$eval('.story-teaser figure > a', links => links.map(link => link.href));
        console.log('links 1',linksOne);
        for (let i=0; i<linksOne.length;i++) {
            allLinksInPage.push(linksOne[i]);

        }

        const otherLinks = await page.$$eval('.story-teaser  > a', links => links.map(link => link.href));
        for (let i=0; i<otherLinks.length;i++) {
            allLinksInPage.push(otherLinks[i]);
        }

        console.log('links 2' , otherLinks);
        for (let i=0; i<allLinksInPage.length;i++){
            console.log("checking if the link is in db", i, allLinksInPage[i]);
            await  checkIfInDb(NEWS,newspaper, currentCounty, allLinksInPage[i]);


        }

        console.log("done!");
    }catch (e) {
        console.log("this error is coming from scrapeDailyNation", e);
    }

}
scrapeDailyNation();