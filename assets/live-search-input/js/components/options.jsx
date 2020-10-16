import React from 'react';
import PropTypes from 'prop-types';

class LiveSearchOptions extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const optionComponents = Array();
        const that = this;
        this.props.options.forEach(function(option){
            optionComponents.push(<li key={option.id} onClick={option.onClickCallBack}>{option.name}{option.parentName?(' en '+option.parentName):''}</li>);
        });
        return(
            <ul>
                {optionComponents}
            </ul>
        );
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
  };

export default LiveSearchOptions;