const fs = require("fs");
const images = fs.readdirSync("./charging_symbols").filter(file => file.endsWith(".png"));

console.log(images);