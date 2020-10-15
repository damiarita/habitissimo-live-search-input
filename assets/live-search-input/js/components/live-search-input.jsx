import React from 'react';
import PropTypes from 'prop-types';
import getAjaxPromise from '../../../tools/ajax/ajax-promise';

class LiveSearchInput extends React.Component{
    constructor(props){
        super(props);

        this.state={
            options: undefined
        };

        const autocompleteApiUrl = props.habitissimoApiBaseUrl + 'autocomplete/category?tree_level[]=1&tree_level[]=2';
        const autocompleteOptionsPromise = getAjaxPromise({
            url: autocompleteApiUrl,
        });
        const that = this;
        autocompleteOptionsPromise.then(function(options){
            that.setState({options: options});
        });

    }

    render(){
        return (
            <div>
                {this.state.options?this.state.options:'Waiting...'}
            </div>
        );
    }
}
LiveSearchInput.propTypes = {
    habitissimoApiBaseUrl: PropTypes.string,
  };

export default LiveSearchInput;