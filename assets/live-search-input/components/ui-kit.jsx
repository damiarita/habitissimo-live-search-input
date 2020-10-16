import React from 'react';
import PropTypes from 'prop-types';
import LiveSearchOptions from './options';

class LiveSearchUiKit extends React.Component{
    constructor(props){
        super(props);
        this.onFocus=this.props.onFocus||function(){};
    }

    render(){
        return (
            <div>
                <label htmlFor={this.props.inputId}>
                    Encuentra profesionales de confianza
                </label>
                <input id={this.props.inputId} value={this.props.inputContent} onFocus={this.onFocus} onChange={this.props.onInputContentChange} />
                <LiveSearchOptions options={this.getFilteredOptions()} inputContent={this.props.inputContent} />
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
    onInputContentChange: PropTypes.func.isRequired,
    onFocus: PropTypes.func,
  };

export default LiveSearchUiKit;