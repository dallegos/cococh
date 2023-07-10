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
 *
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @returns
 */
declare function getLuminance(r: number, g: number, b: number): number;
/**
 *
 * @param {string} color1
 * @param {string} color2
 * @returns
 */
declare function getContrastRatios(
    color1: string,
    color2: string
): ResponseObject;
/**
 *
 * @param {string} color
 * @returns
 */
declare function getRGBObject(
    color: string
): RGBObjectResponse | null | undefined;
/**
 *
 * @param {string} hex
 * @returns
 */
declare function convertHexToRgb(hex: string): RGBObjectResponse | null;
/**
 *
 * @param {string} hsl
 */
declare function convertHSLToRgb(hsl: string): RGBObjectResponse;
/**
 *
 * @param {string} rgb
 */
declare function convertRGBtoRGBObject(rgb: string): RGBObjectResponse;
