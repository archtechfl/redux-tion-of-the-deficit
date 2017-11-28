import React from 'react';

class TextInput extends React.Component {

    constructor(props){
        super(props)
        this.updateUserName = this.props.updateUserName;
    }

    componentDidMount(){
        console.log("Text input mounted");
    }

    render(){
        return (
            <div>
                <label>{this.props.label}</label>
                <input type="text" onChange={this.updateUserName}/>
            </div>
        );
    }

}

export {TextInput}