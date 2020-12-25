const { writeFile, readFile, appendFile, link } = require("fs");
const quotesJson = require("./quotes.json");
const jsonTest = require("./json-prueba.json");

readFile("./json-prueba.json", "utf8", (err, json) => {
    const jsonFile = JSON.parse(json);
    jsonFile.quotes.forEach((userObj) => {
        userObj.img = `link of the image of ${userObj.name} 1`;
    });
    writeFile("./json-prueba.json", JSON.stringify(jsonFile), (err) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("listole");
    });
});

let user = {
    name: "Otro",
    lastName: "Tipo",
};
