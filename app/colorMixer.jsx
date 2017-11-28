import React from 'react';

import C from './constants';

import appReducer from './store/reducers';
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
    }

    handleRGBchange(event) {
        // Fires when one of the RGB values is changed
        let rgbNumber = parseInt(event.target.value);
        let rgbName = event.target.name;
        // Update hex code
        let getHexCode = this.convertRGBtoHex(rgbName, rgbNumber);
        var action = {
            type: C.SET_HEX_CODE,
            payload: {
                "hexCode": getHexCode
            }
        }
        store.dispatch(action);
        // Update RGB values
        var action = {
            type: rgbName,
            payload: {
                "rgbValue": rgbNumber
            }
        }
        store.dispatch(action);
    }

    formatHexNumber(number) {
        let hex = "";
        if (number < 10) {
            hex = "0" + number;
        } else {
            hex = number.toString(16);
        }
        return hex;
    }

    convertRGBtoHex(name, number) {
        // Converts the RGB combination to a hex code
        let rgbValues = {
            red: this.props.red,
            green: this.props.green,
            blue: this.props.blue,
            [name]: parseInt
        };
        let hexValues = {
            red: this.formatHexNumber(rgbValues.red),
            green: this.formatHexNumber(rgbValues.green),
            blue: this.formatHexNumber(rgbValues.blue)
        }
        let hexString = `${hexValues.red}${hexValues.green}${hexValues.blue}`;
        return hexString;
    }

    render(){

        let {
            hexCode,
            red,
            green,
            blue
        } = this.props;

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
                        <input type="text" name="hex" placeholder="FFFFFF" onChange={(e) => this.handleHexChange(e)} value={hexCode}/>
                    </div>
                </div>
                <div className="color-name">
                    <p>Color name: <span className="color-name-value"></span></p>
                </div>
                <div className="color-square">
                    <p>Color square</p>
                    <div className="color-swatch"></div>
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
        blue: state.rgbCodes.blue
    }
}

export default connect(mapStateToProps)(ColorMixer)