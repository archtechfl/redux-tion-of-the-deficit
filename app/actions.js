import C from './constants';

export function updateHex(hexCode) {
    // Update the hex code
    return {
        type: C.SET_HEX_CODE,
        payload: {
            "hexCode": hexCode
        }
    };
};

export function updateAllRGB(parsedHexCode) {
    // Update the hex code
    return {
        type: C.UPDATE_ALL_RGB,
        payload: {
            'red': parsedHexCode.red,
            'green': parsedHexCode.green,
            'blue': parsedHexCode.blue
        }
    };
};

export function updateRGB(rgbName, rgbNumber) {
    // Update the hex code
    console.log("update RGB action");
    return {
        type: rgbName,
        payload: {
            "rgbValue": rgbNumber
        }
    };
};