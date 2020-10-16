import React from 'react';
import PropTypes from 'prop-types';

import TransparentComponent from '../../../tools/generic-components/transparent';

class LiveSearchOptions extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        if(this.props.options.length>0){
            const optionComponents = Array();
            const that = this;
            this.props.options.forEach(function(option){
            optionComponents.push(<li key={option.id} onClick={option.onClickCallBack}>{that.getHighlightedString(option.name)}{option.parentName?(<span> en {that.getHighlightedString(option.parentName)}</span>):''}</li>);
            });
            return(
                <ul>
                    {optionComponents}
                </ul>
            );
        }
        return '';
    }

    getHighlightedString(name){
        if(this.props.inputContent.length>0){
            const nameLower = name.toLowerCase();
            const inputContentLower = this.props.inputContent.toLowerCase();
            const matchingIndex = nameLower.indexOf(inputContentLower);
            if(matchingIndex>=0){
                return (
                    <TransparentComponent>
                        {name.substring(0, matchingIndex)}
                        <b>
                            {name.substring(matchingIndex, matchingIndex + inputContentLower.length)}
                        </b>
                        {this.getHighlightedString( name.substring(matchingIndex + inputContentLower.length) )}
                    </TransparentComponent>
                );
            }
        }
        return name;
    }
}


LiveSearchOptions.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            parentName: PropTypes.string,
            id: PropTypes.string.isRequired,
            normalizedName: PropTypes.string.isRequired,
            onClickCallBack: PropTypes.func.isRequired,
        })
    ).isRequired,
    inputContent: PropTypes.string.isRequired
  };

export default LiveSearchOptions;