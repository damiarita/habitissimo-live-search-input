import React from 'react';
import PropTypes from 'prop-types';
import LiveSearchOptions from './options';
import LiveSearchLens from './lens';
import LiveSearchSpinner from './spinner';

class LiveSearchUiKit extends React.Component{
    constructor(props){
        super(props);
        this.minNumChars=this.props.minNumChars||2;

        this.handleKeyDown=this.handleKeyDown.bind(this);
    }

    render(){
        return (
            <div className="livesearch">
                <label htmlFor={this.props.inputId} className="livesearch-label">
                   {this.props.labelContent}
                </label>
                <div className="livesearch-wrapper">
                    <input  className="livesearch-input" placeholder={this.props.inputPlaceHolder} id={this.props.inputId} value={this.props.inputContent} onFocus={this.props.onFocusIn} onBlur={this.props.onFocusOut} onChange={this.props.onInputContentChange} onKeyDown={this.handleKeyDown} />
                    {this.props.isLoading?<LiveSearchSpinner/>:<LiveSearchLens />}
                    <LiveSearchOptions options={this.getFilteredOptions()} preSelectedOption={this.props.preSelectedOption} inputContent={this.props.inputContent} forceHidden={this.minNumChars>this.props.inputContent.length || !this.props.hasFocus} />
                </div>
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

    handleKeyDown(e){
        const tabKeyCode = 9;
        const enterKeyCode = 13;
        const arrowUpKeyCode = 38;
        const arrowDownKeyCode = 40;
        switch( e.keyCode ){
            case tabKeyCode:
            case enterKeyCode:
                this.acceptNthOption( Math.max(0, this.props.preSelectedOption) );
                e.currentTarget.blur();
                break;
            case arrowUpKeyCode:
                this.props.changePreselectedOption(-1);
                break;
            case arrowDownKeyCode:
                this.props.changePreselectedOption(1);
                break;
        }
    }

    acceptNthOption(n){
        const filteredOptions = this.getFilteredOptions();
        if( filteredOptions.length>n ){
            filteredOptions[n].onClickCallBack();
        }
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
    hasFocus: PropTypes.bool.isRequired,
    preSelectedOption:PropTypes.number.isRequired,
    changePreselectedOption:PropTypes.func.isRequired,
  };

export default LiveSearchUiKit;