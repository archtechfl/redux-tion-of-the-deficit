import React from 'react';

import C from './constants';

import appReducer from './store/reducers';
import { triggerUpdateHex, triggerUpdateRGB, triggerUpdateAllRGB, getColorName } from './actions';
import { Provider, connect } from 'react-redux';

class ColorMixer extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.log("Color mixer mounted");
    }

    handleHexChange(event) {
        // Fires when the hex code is changed
        let hexCode = event.target.value;
        // Call action for update hex code
        this.props.triggerUpdateHex(hexCode);
        // Take the hex code and update the RGB values
        let parsedHexCode = this.parseHexCode(hexCode);
        this.props.triggerUpdateAllRGB(parsedHexCode);
        // Update the color name
        this.props.fetchColorName(hexCode);
    }

    handleRGBchange(event) {
        // Fires when one of the RGB values is changed
        let rgbNumber = parseInt(event.target.value);
        let rgbName = event.target.name;
        // Update RGB values
        // Set RGB number to zero is it is NaN (value is deleted)
        if (isNaN(rgbNumber)){
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
        // Update the RGB value
        this.props.triggerUpdateRGB(rgbName, rgbNumber);
        // Update hex code
        let getHexCode = this.convertRGBtoHex(rgbName, rgbNumber);
        this.props.triggerUpdateHex(getHexCode);
        // Update the color name
        this.props.fetchColorName(getHexCode);
    }

    formatHexNumber(number) {
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

    convertRGBtoHex(name, number) {
        // Converts the RGB combination to a hex code
        // If user deletes the RGB value in the interface, assume "0" for logic but store empty string
        // - If zero is then stored in the state, field will never be blank, bad UX
        if (number === null || number === undefined || number === "") {
            number = 0;
        }
        let rgbValues = {
            red: this.props.red,
            green: this.props.green,
            blue: this.props.blue,
            [name]: parseInt(number)
        };
        let hexValues = {
            red: this.formatHexNumber(rgbValues.red),
            green: this.formatHexNumber(rgbValues.green),
            blue: this.formatHexNumber(rgbValues.blue)
        }
        let hexString = `${hexValues.red}${hexValues.green}${hexValues.blue}`;
        return hexString;
    }

    parseHexCode(code) {
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

    render(){

        let {
            hexCode,
            red,
            green,
            blue,
            colorName
        } = this.props;

        // Create the background color for the swatch
        const swatch = {
            "backgroundColor": `#${hexCode}`
        }

        return (
            <div className="color-mixer-wrapper">
                <h3>Color Controls</h3>
                <div className="rgb-inputs">
                    <div className="red-input">
                        <p>Red</p>
                        <input type="number" name="red" min="0" max="255" onChange={(e) => this.handleRGBchange(e)} value={red}/>
                    </div>
                    <div className="green-input">
                        <p>Green</p>
                        <input type="number" name="green" min="0" max="255" onChange={(e) => this.handleRGBchange(e)} value={green}/>
                    </div>
                    <div className="blue-input">
                        <p>Blue</p>
                        <input type="number" name="blue" min="0" max="255" onChange={(e) => this.handleRGBchange(e)} value={blue}/>
                    </div>
                    <div className="hex-code">
                        <p>Hex code</p>
                        <input type="text" name="hex" placeholder="ffffff" onChange={(e) => this.handleHexChange(e)} value={hexCode}/>
                    </div>
                </div>
                <div className="color-name">
                    <p>Color name: <span className="color-name-value">{colorName}</span></p>
                </div>
                <div className="color-square">
                    <p>Color swatch</p>
                    <div className="color-swatch" style={swatch}></div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        hexCode: state.hexCode,
        red: state.rgbCodes.red,
        green: state.rgbCodes.green,
        blue: state.rgbCodes.blue,
        colorName: state.colorName
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchColorName: (hex) => dispatch(getColorName(hex)),
        triggerUpdateRGB: (rgbName, rgbNumber) => dispatch(triggerUpdateRGB(rgbName, rgbNumber)),
        triggerUpdateAllRGB: (parsedHexCode) => dispatch(triggerUpdateAllRGB(parsedHexCode)),
        triggerUpdateHex: (hexCode) => dispatch(triggerUpdateHex(hexCode))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ColorMixer)