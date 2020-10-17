import React from 'react';
import PropTypes from 'prop-types';

import TransparentComponent from '../../tools/react/generic-components/transparent';

class LiveSearchOption extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <li className={'livesearch-option' + ( this.props.isPreselected?' livesearch-option-preselected':'' )} onMouseDown={this.props.onClickCallBack}>
                {this.getHighlightedString(this.props.name)}{this.props.parentName?(<span className="livesearch-parentName">{this.getHighlightedString( this.props.childNameFormat.replace('%childName%',this.props.parentName) )}</span>):''}
            </li>
        );
    }

    getHighlightedString(name){
        if(this.props.highlightedContent.length>0){
            const nameLower = name.toLowerCase();
            const highlightedContentLower = this.props.highlightedContent.toLowerCase();
            const matchingIndex = nameLower.indexOf(highlightedContentLower);
            if(matchingIndex>=0){
                return (
                    <TransparentComponent>
                        {name.substring(0, matchingIndex)}
                        <b>
                            {name.substring(matchingIndex, matchingIndex + highlightedContentLower.length)}
                        </b>
                        {this.getHighlightedString( name.substring(matchingIndex + highlightedContentLower.length) )}
                    </TransparentComponent>
                );
            }
        }
        return name;
    }
}

LiveSearchOption.propTypes={
    name: PropTypes.string.isRequired,
    parentName: PropTypes.string,
    onClickCallBack: PropTypes.func.isRequired,
    highlightedContent: PropTypes.string.isRequired,
    isPreselected: PropTypes.bool.isRequired,
    childNameFormat: PropTypes.string.isRequired,
};

export default LiveSearchOption;