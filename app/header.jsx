import React from 'react';

export default class Header extends React.Component {

    componentDidMount(){
        console.log("Header mounted");
    }

    render(){
        return (
            <div className="header">
                <h1>React JS color mixing project with names</h1>
            </div>
        );
    }

}