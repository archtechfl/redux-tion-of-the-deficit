import React from 'react';

export default class ColorMixer extends React.Component {

    componentDidMount(){
        console.log("Color mixer mounted");
    }

    render(){
        return (
            <div className="color-mixer-wrapper">
                <h3>Color Controls</h3>
            </div>
        );
    }

}