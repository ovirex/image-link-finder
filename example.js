const puppeteer = require("puppeteer");

let author = "dalai lama";
let searchTerm = `${author} profile picture`;
const googleUrl = `http://www.google.com/search?q=${searchTerm}&tbm=isch`;

(async () => {
    const browser = await puppeteer.launch({ headless: false, devtools: true });
    const page = await browser.newPage();

    await page.goto(googleUrl);
    await page.waitForSelector("#islrg > .islrc > div:first-child > a");
    await page.click("#islrg > .islrc > div:first-child > a");
    await page.waitForSelector(
        "#Sva75c > div > div > div.pxAole > div.tvh9oe.BIB1wf > c-wiz > div.OUZ5W > div.zjoqD > div > div.v4dQwb > a > img"
    );

    debugger;

    await browser.close();
})();
