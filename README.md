<h1 align="center">
    Cococh (Color contrast checker)
</h1>

![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/dallegos/cococh/main?label=version)
![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/dallegos/cococh/main.yml)
[![codecov](https://codecov.io/gh/dallegos/cococh/branch/main/graph/badge.svg?token=SQY9HTTXOK)](https://codecov.io/gh/dallegos/cococh)
![GitHub](https://img.shields.io/github/license/dallegos/cococh)
![npm bundle size](https://img.shields.io/bundlephobia/min/cococh?label=size)


A set of tools for validating the color contrast based on WCAG 2.0 standard.

## Installation

Using `npm`

```bash
npm i cococh@latest
```

Using yarn

```bash
yarn add cococh@latest
```

or installing it manually on package.json

```json
{
    //...otherConfigs,
    "dependencies": {
        "cococh": "^1.2.0"
    }   
}
```

and then do `npm install` or `yarn install`

## Usage

It is possible to use different color formats and combine them:

```js
// With rgb()
const ratios = getContrastRatios("rgb(255, 0, 0)", "rgb(0, 0, 0)");

// with rgb() and 3-digit hexa
const ratios = getContrastRatios("rgb(255, 0, 0)", "#000");

// with hsl() and rgb()
const ratios = getContrastRatios("hsl(0, 100%, 50%)", "rgb(0, 0, 0)");

// with 3-digit hexa and 6-digit hexa
const ratios = getContrastRatios("#f00", "#000000");
```

Any combination is valid, and you will receive an object like this:

```json
{
    "normal": {
        "AA": true,
        "AAA": false
    },
    "large": {
        "AA": true,
        "AAA": true
    }
}
```

You can validate like this:

```js
if (ratios.large.AAA) {
    // Is valid to use as large text on an AAA level
}

if (ratios.large.AA) {
    // Is valid to use as large text on an AA level
}

if (ratios.normal.AAA) {
    // Is valid to use as normal text on an AAA level
}

if (ratios.normal.AA) {
    // Is valid to use as normal text on an AA level
}
```

## Test

To test it use:

```bash
yarn test
```

or

```bash
npm test
```
