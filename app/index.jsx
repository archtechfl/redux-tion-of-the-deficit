import ReactDOM from 'react-dom';
import React from 'react';
import Header from './header.jsx';
import Footer from './footer.jsx';
import ColorMixer from './colorMixer.jsx';

import { createStore } from 'redux';
import appReducer from './store/reducers';
import { Provider, connect } from 'react-redux';

const store = createStore(appReducer);
window.store = store;
console.log('initial state', store.getState());
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
                <Provider store={store}>
                    <ColorMixer />
                </Provider>
                <Footer copyright="©2017 Jeremy Moore."/>
            </div>
        );
    }

}

// Render them
ReactDOM.render(<BaseStation />, document.getElementById('launchpad'));