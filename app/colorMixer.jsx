import React from 'react';

export default class ColorMixer extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.log("Color mixer mounted");
    }

    render(){
        return (
            <div className="color-mixer-wrapper">
                <h3>Color Controls</h3>
                <div className="rgb-inputs">
                    <div className="red-input">
                        <p>Red</p>
                        <input type="number" name="red" min="0" max="255" />
                    </div>
                    <div className="green-input">
                        <p>Green</p>
                        <input type="number" name="green" min="0" max="255" />
                    </div>
                    <div className="blue-input">
                        <p>Blue</p>
                        <input type="number" name="blue" min="0" max="255" />
                    </div>
                    <div className="hex-code">
                        <p>Hex code</p>
                        <input type="text" name="hex" placeholder="FFFFFF" />
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