//----------------------------------------------------------------------------------------------
//requite the configuration variables from the .env file.
require("dotenv").config();
//headless browser driver
const puppeteer = require("puppeteer");
;
//initiate browser, open new page and go to url then return page
async function getBrowser(){
    try{
        console.log("in get page");
     const browser = await puppeteer.launch({
            headless: true,
         args: ['--no-sandbox',
             '--disable-setuid-sandbox',
         ]
        });

    return browser

    }catch (e) {
        console.log("this error is coming from the getBrowser func", e);
    }
}

//------------------------------------------------------------------------------------------------------
//disable js, fonts, images
async function interceptRequests(page){
    await page.setRequestInterception(true);
    page.on('request', (request) => {
        if (['image', 'stylesheet', 'font', 'script'].indexOf(request.resourceType()) !== -1) {
            request.abort();
        } else {
            request.continue();
        }
    });
}




 module.exports = { getBrowser, interceptRequests}
