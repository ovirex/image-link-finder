const puppeteer = require("puppeteer");

let author = "Tony Robbins";
let searchTerm = `${author} face`;
const googleUrl = `http://www.google.com/search?q=${searchTerm}&tbm=isch`;

(async function imageFinder() {
    const browser = await puppeteer.launch({ headless: false, devtools: true });
    const page = await browser.newPage();
    page.setDefaultTimeout(15000);

    try {
        await page.goto(googleUrl);

        await page.waitForSelector("#islrg > .islrc > div:first-child > a");
        await page.click("#islrg > .islrc > div:first-child > a");

        await page.waitForSelector(
            "#Sva75c > div > div > div.pxAole > div.tvh9oe.BIB1wf > c-wiz > div.OUZ5W > div.zjoqD > div > div.v4dQwb > a > img[src^='http']",
            { visible: true }
        );
    } catch (error) {
        console.log(error);
        await page.click("#islrg > .islrc > div:nth-child(2) > a");
        await page.waitForSelector(
            "#Sva75c > div > div > div.pxAole > div.tvh9oe.BIB1wf > c-wiz > div.OUZ5W > div.zjoqD > div > div.v4dQwb > a > img[src^='http']",
            { visible: true }
        );
        debugger;
        // await browser.close();
        // imageFinder();
    }

    const imgURL = await page.evaluate(() => {
        const imgElement = document.querySelector(
            "#Sva75c > div > div > div.pxAole > div.tvh9oe.BIB1wf > c-wiz > div.OUZ5W > div.zjoqD > div > div.v4dQwb > a > img[src^='http']"
        );
        console.log(imgElement);
        return imgElement.src;
    });
    console.log(imgURL);

    debugger;

    await browser.close();
})();
