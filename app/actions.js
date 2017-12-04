import C from './constants';
import { hexCode } from './store/reducers';

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
    // Update all the RGB values
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
    // Update the RGB color value
    return {
        type: rgbName,
        payload: {
            "rgbValue": rgbNumber
        }
    };
};

export function updateColorName(name) {
    // Update the color name based on the API response
    return {
        type: C.SET_COLOR_NAME,
        payload: {
            "colorName": name
        }
    };
};

export function getColorName(hex) {
    let colorURL = `http://www.thecolorapi.com/id?hex=${hex}`;
    // Get the name of the color
    return (dispatch) => {
        fetch(colorURL)
            .then(response => response.json())
            .then(response => {
                // Get the actual color name from the API response
                let colorName = response.name.value;
                dispatch(updateColorName(colorName));
                return response;
            })
            .catch((e) => console.log(e));
    };
};

export function triggerUpdateRGB(rgbName, rgbNumber) {
    // Dispatch the update RGB action
    return (dispatch) => {
        dispatch(updateRGB(rgbName, rgbNumber));
    }
}

export function triggerUpdateAllRGB(parsedHexCode) {
    // Dispatch the update all RGB action
    return (dispatch) => {
        dispatch(updateAllRGB(parsedHexCode));
    }
}

export function triggerUpdateHex(hexCode) {
    // Dispatch the update HEX action
    return (dispatch) => {
        dispatch(updateHex(hexCode));
    }
}