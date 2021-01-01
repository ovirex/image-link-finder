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
            if (quoteObj.author == "Unknown") {
                quoteObj.imgLink =
                    "https://upload.wikimedia.org/wikipedia/commons/b/bc/Unknown_person.jpg";
            } else if (quoteObj.author == "Latin Proverb") {
                quoteObj.imgLink =
                    "https://1.bp.blogspot.com/-nROVZrNNkLM/WPe9I6mHOLI/AAAAAAAABSQ/psG8f-oHFF0C1WofT0jmXf9MwI7fAvQ5wCLcB/s1600/Latin.jpg";
            } else if (quoteObj.author == " Ancient Indian Proverb") {
                quoteObj.imgLink =
                    "https://justbreathemag.com/wp-content/uploads/2016/10/Indian-Wisdom-676.jpg";
            } else if (quoteObj.author == "Japanese Proverb") {
                quoteObj.imgLink =
                    "https://i.pinimg.com/originals/90/ed/db/90eddb2f8910641edf2d7a216b33f8a1.jpg";
            } else if (quoteObj.author == "Chinese Proverb") {
                quoteObj.imgLink =
                    "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/abstract-landscape-painting-on-paper-china-original-watercolor-painting-black-white-chinese-art-elena-ganeva.jpg";
            } else {
                if (
                    quoteObj.imgLink == "" ||
                    !quoteObj.hasOwnProperty("imgLink")
                ) {
                    const link = await imageFinder(quoteObj.author);
                    quoteObj.imgLink = link;
                }
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
