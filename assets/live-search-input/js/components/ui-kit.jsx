import React from 'react';
import PropTypes from 'prop-types';
import getAjaxPromise from '../../../tools/ajax/ajax-promise';
import LiveSearchOptions from './options';

class LiveSearchUiKit extends React.Component{
    constructor(props){
        super(props);

        this.state={
            options: undefined,
            isLoading: false,
            inputContent: '',
        };

        this.autocompleteApiUrl = props.habitissimoApiBaseUrl + 'autocomplete/category?tree_level[]=1&tree_level[]=2';

        this.optionSelectedCallBack = this.props.optionSelectedCallBack||function(id, normalizedName, name){};

        this.getAutocompleteOptions=this.getAutocompleteOptions.bind(this);
        this.onInputContentChange=this.onInputContentChange.bind(this);
        this.getOnSelectedOptionCallback=this.getOnSelectedOptionCallback.bind(this);

    }

    render(){
        const filteredOptions = this.getFilteredOptions();
        return (
            <div>
                <div>
                    <label htmlFor={this.props.inputId}>
                        Encuentra profesionales de confianza
                    </label>
                    <input id={this.props.inputId} value={this.state.inputContent} onFocus={this.getAutocompleteOptions} onChange={this.onInputContentChange} />
                    {filteredOptions.length>0?<LiveSearchOptions options={filteredOptions} />:''}
                </div>
                <div>
                    {this.state.options?JSON.stringify(this.state.options[0]):(this.state.isLoading?'Waiting...':'')}
                </div>
            </div>
        );
    }

    getAutocompleteOptions(){
        if( this.state.options===undefined){

            this.setState({isLoading:true});

            const autocompleteOptionsPromise = getAjaxPromise({
                url: this.autocompleteApiUrl,
            });

            const that = this;
            autocompleteOptionsPromise.then(function(responseString){
                const responseOptions = JSON.parse(responseString);
                const options = Array();
                responseOptions.forEach(function(responseOption){
                    options.push({
                        name:responseOption.name,
                        id: responseOption.id,
                        normalizedName: responseOption.normalized_name,
                        onClickCallBack: that.getOnSelectedOptionCallback(responseOption.id, responseOption.normalized_name, responseOption.name),
                    });
                    if( responseOption.children ){
                        responseOption.children.forEach(function(responseSubOption){
                            options.push({
                                name:responseSubOption.name,
                                id: responseSubOption.id,
                                normalizedName: responseSubOption.normalized_name,
                                parentName: responseOption.name,
                                onClickCallBack: that.getOnSelectedOptionCallback(responseSubOption.id, responseSubOption.normalized_name, responseSubOption.name),
                            });
                        });
                    }
                });

                that.setState({
                    options: options,
                    isLoading: false
                });
            });

        }
    }

    onInputContentChange(e){
        this.setState({inputContent: e.target.value});
    }

    getOnSelectedOptionCallback(id, normalizedName, name){
        return function(){
            this.optionSelectedCallBack(id, normalizedName, name);
        }.bind(this);
    }

    getFilteredOptions(){
        const inputContentLower = this.state.inputContent.toLowerCase();
        if( this.state.options ){
            return this.state.options.filter(function(option){
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
    habitissimoApiBaseUrl: PropTypes.string.isRequired,
    inputId: PropTypes.string.isRequired,
    optionSelectedCallBack: PropTypes.func,
  };

export default LiveSearchUiKit;