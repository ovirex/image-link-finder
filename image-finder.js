const puppeteer = require("puppeteer");

async function imageFinder(authorName) {
    // let author = "Samuel L Jackson";
    let author = authorName;
    let searchTerm = `${author} face author -facebook -twitter`;
    const googleUrl = `http://www.google.com/search?q=${searchTerm}&tbm=isch`;

    const browser = await puppeteer.launch({ headless: false, devtools: true });
    const page = await browser.newPage();

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

    try {
        const imgURL = await page.evaluate(() => {
            const imgElement = document.querySelector(
                "#Sva75c > div > div > div.pxAole > div.tvh9oe.BIB1wf > c-wiz > div.OUZ5W > div.zjoqD > div > div.v4dQwb > a > img[src^='http']"
            );

            if (imgElement.src.match(/^http\w/)) {
                return imgElement.src;
            }
        });

        return imgURL;
    } catch (error) {
        console.log(error);

        return Promise.reject("No link found.");
    } finally {
        await browser.close();
    }
}

module.exports = {
    imageFinder: imageFinder,
};
