function formatHexNumber(number) {
    // Convert the RGB number to a hex number
    let hex = "";
    // If number is less than 16, need to add appropriate formatting
    if (number < 16) {
        if (number < 10){
            hex = "0" + number;
        } else {
            hex = "0" + number.toString(16);
        }
    } else {
        hex = number.toString(16);
    }
    return hex;
}

function parseHexCode(code) {
    // get the RGB numbers from the hex code
    let red = parseInt(code.substring(0, 2), 16);
    let green = parseInt(code.substring(2, 4), 16);
    let blue = parseInt(code.substring(4, 6), 16);
    // Sanity logic in the event that the hex code string is not complete or out of range
    if (isNaN(green)){
        green = 0;
    };
    if (isNaN(red)){
        red = 0;
    };
    if (isNaN(blue)){
        blue = 0;
    };
    // Returns the RGB value dictionary
    return {
        'red': red,
        'green': green,
        'blue': blue
    }
}

function generateHexString(rgb) {
    // Purpose: take a dictionary of RGB values and convert to hex string
    let hexValues = {
        red: formatHexNumber(validate_rgb_number(rgb.red)),
        green: formatHexNumber(validate_rgb_number(rgb.green)),
        blue: formatHexNumber(validate_rgb_number(rgb.blue))
    }
    let hexString = `${hexValues.red}${hexValues.green}${hexValues.blue}`;
    return hexString;
}

function validate_rgb_number(rgbNumber) {
    // If the RGB number is out of range, bring it into range 0-255
    if (isNaN(rgbNumber)){
        // Set RGB number to empty string if it is deleted
        // Setting RGB value to 0 if it is deleted in the UI has undesired effect, makes value incapable of being deleted (only overwritten), bad UX
        rgbNumber = "";
    } else {
        // Handle manual input causing the RGB number value to go out of bounds (abovr 255 or below 0)
        if (rgbNumber > 255 || rgbNumber < 0) {
            if (rgbNumber > 255) {
                rgbNumber = 255;
            } else {
                rgbNumber = 0;
            }
        }
    }
    return rgbNumber;
}

function validateHexCode(hexCode){
    // Examine the hex code and correct any values that are out of bounds high (i.e. anything above 'f' should be brought down to 'f')
    let hexValues = hexCode.split("");
    var correctedHexValues = hexValues.map(function(value) {
        // Find values above f
        var regEx = /[0-9]|[a-f]/g;
        var outOfBounds = value.search(regEx);
        var validatedValue = value;
        if (outOfBounds < 0) {
            // Character is not a valid hex, convert to f to bring character into the valid range
            validatedValue = "f";
        }
        return validatedValue;
    });
    // Take the corrected array and turn it back into a string for processing
    return correctedHexValues.join("");
}

 module.exports = {
    formatHexNumber: formatHexNumber,
    parseHexCode: parseHexCode,
    generateHexString: generateHexString,
    validate_rgb_number: validate_rgb_number,
    validateHexCode: validateHexCode
}