const { getBrowser, interceptRequests} = require('./scraper')
const checkIfInDb  = require('./mongoose.js');
const links = require('./goToLinks/standardlinks.js');
const select = require("puppeteer-select");
const NEWS  = require('../models/allUrlsSchema.model.js')

async function checkIfLoadMoreButtonIsVisible(page,selector){
    try{
        let visible = true;
        await page
            .waitForSelector(selector, {visible:true, timeout:2000})
            .catch(()=> {
                visible = false;
        });
        return visible;
    }catch (e) {
        console.log("this error is coming from thecheckIfLoadMoreButtonIsVisible ", e);
    }
}

async function clickLoadMoreButton(page, selector){
try{
    let load = await checkIfLoadMoreButtonIsVisible(page, selector);
    while(load){
        console.log('clicking load more button',selector)
        let button = await select(page).getElement(selector);
        await button.click()
            .catch(()=>{});
        load = await checkIfLoadMoreButtonIsVisible(page, selector);
    }
}catch (e) {
    console.log("this error is coming from clickLoadMoreButton ", e);

}
}
async function scrapeStandard() {
    try{
        const browser = await getBrowser();
        const page = await browser.newPage();
        for(let link of links){
            console.log("this is a link", link);
            await page.goto(link,{ timeout: 60000});

            //close modal
            let modalClose = '#PopupSignupForm_0 > div.mc-modal > div.mc-closeModal';
            // let buttonModalClose = await select(page).getElement(modalClose);
            // buttonModalClose.click();

            await clickLoadMoreButton(page,modalClose)

            //click load more button, blue and red
            let moreButtonSelector = '.btn-primary';
            await clickLoadMoreButton(page, moreButtonSelector);
            let redButton = ' .btn-outline-danger'
            await clickLoadMoreButton(page, redButton);

            //append all links in blue and red zone
            const allStandardLinks = [];
            const allLinksInBlueZone= await page.$$eval('.d-block h6 > a', links => links.map(link => link.href));
            // console.log("links in blue zone", allLinksInBlueZone);
            for(let i=0; i<allLinksInBlueZone.length;i++){
                allStandardLinks.push(allLinksInBlueZone[i]);

            }
            const allLinksInRedZone = await page.$$eval('.author-img > a', links => links.map(link => link.href));
            // console.log("links in red zone", allLinksInRedZone);
            for(let i=0; i<allLinksInRedZone.length;i++){
                allStandardLinks.push(allLinksInRedZone[i]);

            }
            console.log("links in all zones", allStandardLinks);

            //
            for (let i=0; i<allStandardLinks.length;i++){
                console.log("checking if the link is in db", i, allStandardLinks[i]);

                 await  checkIfInDb( NEWS, allStandardLinks[i]);


            }
        }
        console.log("done!");
    }catch (e) {
        console.log("this error is coming from scrapeDailyNation", e);
    }

}
scrapeStandard();