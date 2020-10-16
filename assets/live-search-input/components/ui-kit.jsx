import React from 'react';
import PropTypes from 'prop-types';
import LiveSearchOptions from './options';

class LiveSearchUiKit extends React.Component{
    constructor(props){
        super(props);
        this.minNumChars=this.props.minNumChars||2;
    }

    render(){
        return (
            <div>
                <label htmlFor={this.props.inputId}>
                   {this.props.labelContent}
                </label>
                <input placeholder={this.props.inputPlaceHolder} id={this.props.inputId} value={this.props.inputContent} onFocus={this.props.onFocusIn} onBlur={this.props.onFocusOut} onChange={this.props.onInputContentChange} />
                {(this.minNumChars<=this.props.inputContent.length && this.props.hasFocus)?<LiveSearchOptions options={this.getFilteredOptions()} inputContent={this.props.inputContent} />:''}
            </div>
        );
    }

    getFilteredOptions(){
        if( this.props.options ){
            const inputContentLower = this.props.inputContent.toLowerCase();
            return this.props.options.filter(function(option){
                if(option.name.toLowerCase().indexOf(inputContentLower)>=0){ //inputContentLower is included in option.name
                    return true;
                }
                if(option.parentName){ //If the option has a parentName
                    if(option.parentName.toLowerCase().indexOf(inputContentLower)>=0){ //inputContentLower is included in option.parentName
                        return true;
                    }
                }
                return false;
            });
        }
        return Array();
    }
}
LiveSearchUiKit.propTypes = {
    labelContent: PropTypes.string.isRequired,
    inputPlaceHolder: PropTypes.string.isRequired,
    inputId: PropTypes.string.isRequired,
    options:  PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            parentName: PropTypes.string,
            id: PropTypes.string.isRequired,
            normalizedName: PropTypes.string.isRequired,
            onClickCallBack: PropTypes.func.isRequired,
        })
    ),
    isLoading: PropTypes.bool.isRequired,
    inputContent: PropTypes.string.isRequired,
    minNumChars: PropTypes.number,
    onInputContentChange: PropTypes.func.isRequired,
    onFocusIn: PropTypes.func.isRequired,
    onFocusOut: PropTypes.func.isRequired,
    hasFocus: PropTypes.bool.isRequired
  };

export default LiveSearchUiKit;