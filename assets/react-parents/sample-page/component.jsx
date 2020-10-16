import React from 'react';
import PropTypes from 'prop-types';
import LiveSearchUiKit from '../../live-search-input/components/ui-kit';
import getAjaxPromise from '../../tools/ajax/ajax-promise';

class SamplePage extends React.Component{
    constructor(props){
        super(props);

        this.state={
            liveSearchOptions: undefined,
            liveSearchIsLoading: false,
            liveSearchInputContent: '',
        };

        this.liveSearchAutocompleteApiUrl = props.habitissimoApiBaseUrl + 'autocomplete/category?tree_level[]=1&tree_level[]=2';

        this.getLiveSearchAutocompleteOptions=this.getLiveSearchAutocompleteOptions.bind(this);
        this.liveSearchInputContentChange=this.liveSearchInputContentChange.bind(this);
    }

    render(){
        return (
        <LiveSearchUiKit
            inputId='live-search-input'
            options={this.state.liveSearchOptions}
            isLoading={this.state.liveSearchIsLoading}
            inputContent={this.state.liveSearchInputContent}
            onInputContentChange={this.liveSearchInputContentChange}
            onFocus={this.getLiveSearchAutocompleteOptions}
        />
        );
    }

    getLiveSearchAutocompleteOptions(){
        if( this.state.liveSearchOptions===undefined){

            this.setState({liveSearchIsLoading:true});

            const autocompleteOptionsPromise = getAjaxPromise({
                url: this.liveSearchAutocompleteApiUrl,
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
                    liveSearchOptions: options,
                    liveSearchIsLoading: false
                });
            });

        }
    }  

    getOnSelectedOptionCallback(id, normalizedName, name){
        return function(){
            console.log(id, normalizedName, name); //As an example, we put console.log It is asumed that when an option is selected,there has to be some kind of reaction by the rest of the page
        }
    }

    liveSearchInputContentChange(e){
        this.setState({liveSearchInputContent: e.target.value});
    }
}
SamplePage.propTypes = {
    habitissimoApiBaseUrl: PropTypes.string.isRequired,
  };

export default SamplePage;