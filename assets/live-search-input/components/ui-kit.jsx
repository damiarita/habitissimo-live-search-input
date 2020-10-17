import React from 'react';
import PropTypes from 'prop-types';
import LiveSearchList from './list';
import LiveSearchLens from './lens';
import LiveSearchSpinner from './spinner';
import LiveSearchOption from './option';

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
                    <LiveSearchList isHidden={this.minNumChars>this.props.inputContent.length || !this.props.hasFocus || this.props.filteredOptions.length===0} >
                        {this.props.filteredOptions.map(function(option, index){
                            return (<LiveSearchOption key={option.id} name={option.name} parentName={option.parentName} onClickCallBack={option.onClickCallBack} highlightedContent={this.props.inputContent} isPreselected={this.props.preSelectedOption===index} childNameFormat={this.props.optionChildNameFormat} />);
                        }.bind(this))}
                    </LiveSearchList>
                </div>
            </div>
        );
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
        if( this.props.filteredOptions.length>n ){
            this.props.filteredOptions[n].onClickCallBack();
        }
    }
}
LiveSearchUiKit.propTypes = {
    labelContent: PropTypes.string.isRequired,
    inputPlaceHolder: PropTypes.string.isRequired,
    inputId: PropTypes.string.isRequired,
    filteredOptions:  PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            parentName: PropTypes.string,
            id: PropTypes.string.isRequired,
            onClickCallBack: PropTypes.func.isRequired,
        })
    ).isRequired,
    isLoading: PropTypes.bool.isRequired,
    inputContent: PropTypes.string.isRequired,
    minNumChars: PropTypes.number,
    onInputContentChange: PropTypes.func.isRequired,
    onFocusIn: PropTypes.func.isRequired,
    onFocusOut: PropTypes.func.isRequired,
    hasFocus: PropTypes.bool.isRequired,
    preSelectedOption:PropTypes.number.isRequired,
    changePreselectedOption:PropTypes.func.isRequired,
    optionChildNameFormat:PropTypes.string.isRequired,
  };

export default LiveSearchUiKit;