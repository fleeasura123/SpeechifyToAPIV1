async function setSelectVal(sel, val) {
    g_page.evaluate((data) => {
        const input = document.querySelector(data.sel);
        return input.innerHTML = data.val
    }, {sel, val})
}

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

g_app.get('/', async (req, res) => {
    return res.json({
        success: true
    });
});

g_app.post('/api/speak', async (req, res) => {
    try {        
        const message = req.body.content.trim();

        const textarea = await g_page.waitForSelector('div[data-placeholder="Enter text here"]');

        await setSelectVal('div[data-placeholder="Enter text here"]', message);

        await textarea.type(' ');

        const button = await g_page.waitForSelector('.right-side-tools button');

        const isSpeaking = await button.$('.right-side-tools button svg[width="24"') !== null;

        // Stop the button first before playing new message
        if(isSpeaking)
            await button.click();

        await sleep(1500);

        await button.click();

        return res.json({
            success: true
        });
    } catch (err) {
        return res.json({
            success: false,
            message: 'Something went wrong'
        });
    }
});