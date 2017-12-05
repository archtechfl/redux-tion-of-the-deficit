import React from 'react';

import C from './constants';

import appReducer from './store/reducers';
import { triggerUpdateHex, triggerUpdateRGB, triggerUpdateAllRGB, getColorName } from './actions';
import { Provider, connect } from 'react-redux';

import {
    formatHexNumber,
    parseHexCode,
    generateHexString,
    validate_rgb_number,
    validateHexCode
} from './utils';

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
        // Validate hex code
        let validatedHexCode = validateHexCode(hexCode);
        // Call action for update hex code
        this.props.triggerUpdateHex(validatedHexCode);
        // Take the hex code and update the RGB values
        let parsedHexCode = parseHexCode(hexCode);
        this.props.triggerUpdateAllRGB(parsedHexCode);
        // Get the complete hex code
        let completeHexCode = generateHexString(parsedHexCode);
        // Update the color name
        this.props.fetchColorName(completeHexCode);
    }

    handleRGBchange(event) {
        // Fires when one of the RGB values is changed
        let rgbNumber = parseInt(event.target.value);
        let rgbName = event.target.name;
        // Update RGB values
        // Validate the RGB number value (if out of range)
        let validatedNumber = validate_rgb_number(rgbNumber);
        // Update the RGB value
        this.props.triggerUpdateRGB(rgbName, validatedNumber);
        // Update hex code
        let getHexCode = this.convertRGBtoHex(rgbName, validatedNumber);
        this.props.triggerUpdateHex(getHexCode);
        // Update the color name
        this.props.fetchColorName(getHexCode);
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
        // Pass the RGB dict to the util function for deriving a hex string
        return generateHexString(rgbValues);
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
            "backgroundColor": `rgb(${red},${green},${blue})`
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