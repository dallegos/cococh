declare const hexaRegex3: RegExp;
declare const hexaRegex6: RegExp;
declare const HSLRegex: RegExp;
declare const RGBRegex: RegExp;
declare interface RGBObjectResponse {
    r: number;
    g: number;
    b: number;
}
export interface ResponseLevels {
    AA: boolean;
    AAA: boolean;
}
export interface ResponseObject {
    [key: string]: ResponseLevels;
}
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
declare function getLuminance(r: number, g: number, b: number): number;
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
declare function getContrastRatios(
    foregroundColor: string,
    backgroundColor: string
): ResponseObject;
/**
 * Converts the color string into an RGB object.
 * The color formats can be: `HSL`, `RGB`, `hexadecimal`.
 *
 * @param {string} color The color to parse
 * @returns The color parsed as an RGB object.
 */
declare function getRGBObject(color: string): RGBObjectResponse;
/**
 * Converts the Hexadecimal formatted color string into an RGB object.
 *
 * @param {string} hex The Hexadecimal formatted color string
 * @returns The color parsed as an RGB object.
 */
declare function convertHexToRgb(hex: string): RGBObjectResponse;
/**
 * Converts the HSL formatted color string into an RGB object.
 *
 * @param {string} hsl The HSL formatted color string
 * @link https://www.w3.org/TR/css-color-3/#hsl-color
 * @returns The color parsed as an RGB object.
 */
declare function convertHSLToRgb(hsl: string): RGBObjectResponse;
/**
 * Converts the RGB formatted color string into an RGB object.
 *
 * @param {string} rgb The RGB formatted color string into an RGB object.
 * @returns The color parsed as an RGB object.
 */
declare function convertRGBtoRGBObject(rgb: string): RGBObjectResponse;
