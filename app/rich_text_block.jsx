import React from 'react';

export default class RichTextBlock extends React.Component {

    componentDidMount(){
        console.log("Rich text block mounted");
    }

    createMarkup(){
        return {__html: this.props.text};
    }

    render(){
        return (
            <div className="rich-text-block">
                <p dangerouslySetInnerHTML={this.createMarkup()}></p>
            </div>
        );
    }

}