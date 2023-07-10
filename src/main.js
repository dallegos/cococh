"use strict";

const hexaRegex3 = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
const hexaRegex6 = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
const HSLRegex = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/i;
const RGBRegex = /rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/i;

/**
 * The ratios to match defined here:
 * https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast-contrast.html
 */
const RATIOS = {
    normal: {
        AA: 4.5,
        AAA: 7,
    },
    large: {
        AA: 3,
        AAA: 4.5,
    },
};

/**
 * The relative brightness of any point in a colorspace,
 * normalized to 0 for darkest black and 1 for lightest white.
 *
 * @param {number} r The red color value
 * @param {number} g The green color value
 * @param {number} b The blue color value
 * @link https://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
 * @returns The luminance value
 */
function getLuminance(r, g, b) {
    var a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });

    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

/**
 * Retrieves an object with all the contrast ratio options based on WCAG 2.0 standard.
 * It is possible to use different color formats and combine them:
 * ```
 * const ratios = getContrastRatios("rgb(255, 0, 0)", "rgb(0, 0, 0)");
 * const ratios = getContrastRatios("rgb(255, 0, 0)", "#000");
 * const ratios = getContrastRatios("hsl(0, 100%, 50%)", "rgb(0, 0, 0)");
 * const ratios = getContrastRatios("#f00", "#000000");
 *
 * if (ratios.large.AAA) {
 *     // Is valid to use as large text on an AAA level
 * }
 *
 * if (ratios.large.AA) {
 *     // Is valid to use as large text on an AA level
 * }
 *
 * if (ratios.normal.AAA) {
 *     // Is valid to use as normal text on an AAA level
 * }
 *
 * if (ratios.normal.AA) {
 *     // Is valid to use as normal text on an AA level
 * }
 * ```
 * @param {string} foregroundColor The foreground color
 * @param {string} backgroundColor The background color
 * @link https://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef
 * @returns An object with the validity of contrast ratios
 */
function getContrastRatios(foregroundColor, backgroundColor) {
    const rgb1 = getRGBObject(foregroundColor);
    const rgb2 = getRGBObject(backgroundColor);

    const frontLuminance = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const backLuminance = getLuminance(rgb2.r, rgb2.g, rgb2.b);

    const ratio =
        (Math.max(frontLuminance, backLuminance) + 0.05) /
        (Math.min(frontLuminance, backLuminance) + 0.05);

    return Object.keys(RATIOS).reduce((acc, key) => {
        acc[key] = Object.entries(RATIOS[key]).reduce((currentAcc, current) => {
            currentAcc[current[0]] = ratio >= current[1];

            return currentAcc;
        }, {});

        return acc;
    }, {});
}

/**
 * Converts the color string into an RGB object.
 * The color formats can be: `HSL`, `RGB`, `hexadecimal`.
 *
 * @param {string} color The color to parse
 * @returns The color parsed as an RGB object.
 */
function getRGBObject(color) {
    if (hexaRegex3.exec(color) || hexaRegex6.exec(color)) {
        return convertHexToRgb(color);
    }

    if (HSLRegex.exec(color)) {
        return convertHSLToRgb(color);
    }

    if (RGBRegex.exec(color)) {
        return convertRGBtoRGBObject(color);
    }
}

/**
 * Converts the Hexadecimal formatted color string into an RGB object.
 *
 * @param {string} hex The Hexadecimal formatted color string
 * @returns The color parsed as an RGB object.
 */
function convertHexToRgb(hex) {
    // Converts the 3-digit formatted string into a 6-digit one
    hex = hex.replace(hexaRegex3, function (_, r, g, b) {
        return r + r + g + g + b + b;
    });

    var [_, r, g, b] = hexaRegex6.exec(hex);

    return {
        r: parseInt(r, 16),
        g: parseInt(g, 16),
        b: parseInt(b, 16),
    };
}

/**
 * Converts the HSL formatted color string into an RGB object.
 *
 * @param {string} hsl The HSL formatted color string
 * @link https://www.w3.org/TR/css-color-3/#hsl-color
 * @returns The color parsed as an RGB object.
 */
function convertHSLToRgb(hsl) {
    let [_, h, s, l] = HSLRegex.exec(hsl);

    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color);
    };

    return {
        r: f(0),
        b: f(4),
        g: f(8),
    };
}

/**
 * Converts the RGB formatted color string into an RGB object.
 *
 * @param {string} rgb The RGB formatted color string into an RGB object.
 * @returns The color parsed as an RGB object.
 */
function convertRGBtoRGBObject(rgb) {
    const [_, r, g, b] = RGBRegex.exec(rgb);

    return {
        r: parseInt(r),
        g: parseInt(g),
        b: parseInt(b),
    };
}

module.exports = {
    RATIOS,
    getContrastRatios,
    getRGBObject,
    convertHexToRgb,
    convertHSLToRgb,
    convertRGBtoRGBObject,
};
