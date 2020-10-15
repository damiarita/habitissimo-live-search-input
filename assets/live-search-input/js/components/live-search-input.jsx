import React from 'react';
import PropTypes from 'prop-types';
import getAjaxPromise from '../../../tools/ajax/ajax-promise';

class LiveSearchInput extends React.Component{
    constructor(props){
        super(props);

        this.state={
            options: undefined
        };

        this.autocompleteApiUrl = props.habitissimoApiBaseUrl + 'autocomplete/category?tree_level[]=1&tree_level[]=2';

        this.getAutocompleteOptions=this.getAutocompleteOptions.bind(this);

    }

    render(){
        return (
            <div>
                <div>
                    <label htmlFor="id-input">
                        Encuentra profesionales de confianza
                    </label>
                    <input id="id-input" onFocus={this.getAutocompleteOptions}/>
                </div>
                <div>
                    {this.state.options?JSON.stringify(this.state.options[0]):'Waiting...'}
                </div>
            </div>
        );
    }

    getAutocompleteOptions(){
        if( this.state.options===undefined){
            const autocompleteOptionsPromise = getAjaxPromise({
                url: this.autocompleteApiUrl,
            });
            const that = this;
            autocompleteOptionsPromise.then(function(options){
                that.setState({options: JSON.parse(options)});
            });
        }
    }
}
LiveSearchInput.propTypes = {
    habitissimoApiBaseUrl: PropTypes.string,
  };

export default LiveSearchInput;