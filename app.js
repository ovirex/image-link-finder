const { writeFile, readFile, writeFileSync } = require("fs");
const { imageFinder } = require("./image-finder");

const referenceFile = "./quotes.json";
const outputFile = "new-quotes.json";

readFile(referenceFile, "utf8", async (err, jsonFile) => {
    if (err) {
        console.log(err);
        return;
    }
    const quotesFile = JSON.parse(jsonFile);

    let index = 0;
    for (const quoteObj of quotesFile.quotes) {
        console.log(index, quoteObj);
        try {
            if (quoteObj.imgLink == "" || !quoteObj.hasOwnProperty("imgLink")) {
                const link = await imageFinder(quoteObj.author);
                quoteObj.imgLink = link;
            }
        } catch (err) {
            console.log(err);
            quoteObj.imgLink = err;
        } finally {
            try {
                writeFileSync(outputFile, JSON.stringify(quotesFile));
                console.log("Proceso Finalizado. JSON Actualizado.");
            } catch (error) {
                console.log(error);
            }
        }

        index++;
        if (index == quotesFile.quotes.length) {
            console.log("Proceso de Busqueda Finalizado");
        }
    }
});
