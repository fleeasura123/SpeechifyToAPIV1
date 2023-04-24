(async () => {

    /**
     * Puppeteer
     */
    const puppeteer = require('puppeteer-extra');

    const StealthPlugin = require('puppeteer-extra-plugin-stealth');

    const { executablePath } = require('puppeteer');

    puppeteer.use(StealthPlugin());

    const browser = await puppeteer.launch({
        headless: false,
        executablePath: executablePath(),
        userDataDir: './tmp'
    });

    global.g_page = await browser.newPage();

    await g_page.goto('https://voiceover.speechify.com/editor/');

    /**
     * AI Status
     */
    global.g_isFinishedAnswering = true;

    /**
     * Web API
     */
    require('./webapi');

})();