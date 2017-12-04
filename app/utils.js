function convertRGBtoHex(red, green, blue, name, number) {
    // Converts the RGB combination to a hex code
    // If user deletes the RGB value in the interface, assume "0" for logic but store empty string
    // - If zero is then stored in the state, field will never be blank, bad UX
    if (number === null || number === undefined || number === "") {
        number = 0;
    }
    let rgbValues = {
        red: red,
        green: green,
        blue: blue,
        [name]: parseInt(number)
    };
    let hexValues = {
        red: formatHexNumber(rgbValues.red),
        green: formatHexNumber(rgbValues.green),
        blue: formatHexNumber(rgbValues.blue)
    }
    let hexString = `${hexValues.red}${hexValues.green}${hexValues.blue}`;
    return hexString;
}

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
    // Sanity logic in the event that the hex code string is not complete
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
        red: formatHexNumber(rgb.red),
        green: formatHexNumber(rgb.green),
        blue: formatHexNumber(rgb.blue)
    }
    let hexString = `${hexValues.red}${hexValues.green}${hexValues.blue}`;
    return hexString;
}

export { convertRGBtoHex, formatHexNumber, parseHexCode, generateHexString };