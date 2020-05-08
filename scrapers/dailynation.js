const { getBrowser, interceptRequests} = require('./scraper');
const checkIfInDb  = require('./mongoose.js');
async function scrapeDailyNation(county, link, NEWS) {
    try{
        const browser = await getBrowser();
        const page = await browser.newPage();
        // await interceptRequests(page);
         let currentCounty = county;
         let newspaper = 'Daily Nation';
         console.log("this is a link", link);
         await page.goto(link,{ timeout: 180000});
            // console.log(links)
         const allLinksInPage = await page.$$eval('.small-story-list h5 > a', links => links.map(link => link.href));
           // console.log(allLinksInPage)
         for (let i=0; i<allLinksInPage.length;i++){
         console.log("checking if the link is in db", i, allLinksInPage[i]);
         await  checkIfInDb(NEWS,newspaper, currentCounty, allLinksInPage[i]);
         }
        console.log("done!");
    }catch (e) {
        console.log("this error is coming from scrapeDailyNation", e);
    }

}
module.exports = scrapeDailyNation