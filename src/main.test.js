const { getContrastRatios, getRGBObject } = require("../src/main");

const RedRGB = {
    r: 255,
    g: 0,
    b: 0,
};

describe("Hexadecimal colors", () => {
    it("should return the correct rgb object from a 3 digit color string", () => {
        const RGBObject = getRGBObject("#F00");
        expect(RGBObject).toEqual(RedRGB);
    });

    it("should return the correct rgb object from a 6 digit color string", () => {
        const RGBObject = getRGBObject("#FF0000");
        expect(RGBObject).toEqual(RedRGB);
    });

    it("should fail with an invalid color string format", () => {
        ["#FF00000", "#FF000", "##FFF000"].forEach((option) => {
            const RGBObject = getRGBObject(option);
            expect(RGBObject).toBeFalsy();
        });
    });
});

describe("HSL colors", () => {
    it("should return the correct rgb object from a HSL color string with spaces", () => {
        const RGBObject = getRGBObject("hsl(0, 100%, 50%)");
        expect(RGBObject).toEqual(RedRGB);
    });

    it("should return the correct rgb object from a HSL color string without spaces", () => {
        const RGBObject = getRGBObject("hsl(0,100%,50%)");
        expect(RGBObject).toEqual(RedRGB);
    });

    it("should fail with an invalid color string format", () => {
        [
            "hsl(0%,100%,50%)",
            "hsl(0,100,50%)",
            "hsl(0,100%,50)",
            "hsl(0,100,50)",
            "hsla(0,100,50)",
            "hsla(0,100%,50%,1)",
        ].forEach((option) => {
            const RGBObject = getRGBObject(option);
            expect(RGBObject).toBeFalsy();
        });
    });
});

describe("RGB colors", () => {
    it("should return the correct rgb object from a RGB color string with spaces", () => {
        const RGBObject = getRGBObject("rgb(255, 0, 0)");
        expect(RGBObject).toEqual(RedRGB);
    });

    it("should return the correct rgb object from a RGB color string without spaces", () => {
        const RGBObject = getRGBObject("rgb(255,0,0)");
        expect(RGBObject).toEqual(RedRGB);
    });

    it("should fail with an invalid color string format", () => {
        ["rgba(0,0,0)", "rgba(0,0,0,1)"].forEach((option) => {
            const RGBObject = getRGBObject(option);
            expect(RGBObject).toBeFalsy();
        });
    });
});

describe("AA Level", () => {
    it("should return true when contrast is valid on large text", () => {
        let ratios = getContrastRatios("#FF0000", "#000000");
        expect(ratios.large.AA).toBeTruthy();
    });

    it("should return true when contrast is valid on normal text", () => {
        let ratios = getContrastRatios("#FF0000", "#000000");
        expect(ratios.normal.AA).toBeTruthy();
    });

    it("should return false when contrast is invalid on large text", () => {
        let ratios = getContrastRatios("#FF0000", "#FF0000");
        expect(ratios.large.AA).toBeFalsy();
    });

    it("should return false when contrast is invalid on normal text", () => {
        let ratios = getContrastRatios("#FF0000", "#FF0000");
        expect(ratios.normal.AA).toBeFalsy();
    });
});

describe("AAA Level", () => {
    it("should return true when contrast is valid on large text", () => {
        let ratios = getContrastRatios("#FF0000", "#000000");
        expect(ratios.large.AAA).toBeTruthy();
    });

    it("should return true when contrast is valid on normal text", () => {
        let ratios = getContrastRatios("#003035", "#00d180");
        expect(ratios.normal.AAA).toBeTruthy();
    });

    it("should return false when contrast is invalid on large text", () => {
        let ratios = getContrastRatios("#FF0000", "#FF0000");
        expect(ratios.large.AAA).toBeFalsy();
    });

    it("should return false when contrast is invalid on normal text", () => {
        let ratios = getContrastRatios("#FF0000", "#000000");
        expect(ratios.normal.AAA).toBeFalsy();
    });
});
