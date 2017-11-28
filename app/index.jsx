import ReactDOM from 'react-dom';
import React from 'react';
import Header from './header.jsx';
import Footer from './footer.jsx';
import ColorMixer from './colorMixer.jsx';

class BaseStation extends React.Component {

    constructor(props){
        super(props);
    }

    componentDidMount(){
        console.log("Base mounted");
    }

    render(){
        return (
            <div>
                <Header greeting="Jeremy's Color Mixer"/>
                <ColorMixer />
                <Footer copyright="©2017 Jeremy Moore."/>
            </div>
        );
    }

}

// Render them
ReactDOM.render(<BaseStation />, document.getElementById('launchpad'));