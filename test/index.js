const {
    getContrastRatios,
    convertHexToRgb,
    convertHSLToRgb,
    convertRGBtoRGBObject,
} = require("../src/main");

const hexaColor1 = "#ff0000";
const hexaColor2 = "#000000";
const hexaColor3 = "#f00";
const hslColor1 = "	hsl(0, 100%, 50%)";
const rgbColor1 = "rgb(255, 0, 0)";
const rgbColor2 = "rgb(255,0,0)";

// Hexa 3
console.log(getContrastRatios(hexaColor3, hexaColor2));

// Hexa 6
console.log(getContrastRatios(hexaColor1, hexaColor2));

// HSL
console.log(getContrastRatios(hslColor1, hexaColor2));

// RGB
console.log(getContrastRatios(rgbColor1, hexaColor2));

// RGB 2
console.log(getContrastRatios(rgbColor2, hexaColor2));
