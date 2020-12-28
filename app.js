const { writeFile, readFile } = require("fs");
const { imageFinder } = require("./image-finder");

const jsonTest = require("./json-prueba.json");

readFile("./json-prueba.json", "utf8", async (err, jsonFile) => {
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
            writeFile(
                "./json-prueba.json",
                JSON.stringify(quotesFile),
                (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    console.log("Proceso Finalizado. JSON Actualizado.");
                }
            );
        }

        index++;
        if (index == quotesFile.quotes.length) {
            console.log("Proceso de Busqueda Finalizado");
        }
    }
});
