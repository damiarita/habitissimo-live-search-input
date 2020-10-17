import GenericStateManager from '../../tools/react/state-manager';
import getAjaxPromise from '../../tools/ajax/ajax-promise';

export default class LiveSearchStateManager extends GenericStateManager{
    constructor(setStateCallback, stateProperty, habitissimoApiBaseUrl, selectecOptionCallBack){
        super(setStateCallback, stateProperty);
        this.state={
            options: undefined,
            isLoading: false,
            inputContent: '',
            hasFocus: false,
            preselectedOption: -1,
        };
        this.autocompleteApiUrl = habitissimoApiBaseUrl + 'autocomplete/category?tree_level[]=1&tree_level[]=2';
        this.selectecOptionCallBack = selectecOptionCallBack;

        this.onInputContentChange=this.onInputContentChange.bind(this);
        this.onFocusIn=this.onFocusIn.bind(this);
        this.onFocusOut=this.onFocusOut.bind(this);
        this.changePreselectedOption=this.changePreselectedOption.bind(this);
    }
    

    getAutocompleteOptions(){
        if( this.state.options===undefined){

            this.state.isLoading=true;
            this.updateState();

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

                that.state.options=options;
                that.state.isLoading=false;
                that.updateState();
            });

        }
    }  

    getFilteredOptions(){
        if( this.state.options ){
            const inputContentLower = this.state.inputContent.toLowerCase();
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

    getOnSelectedOptionCallback(id, normalizedName, name){
        return function(){
            this.state.inputContent = name;
            this.updateState();
            this.selectecOptionCallBack(id, normalizedName, name);
        }.bind(this);
    }
    

    onInputContentChange(e){
        this.state.inputContent = e.target.value;
        this.state.preselectedOption = -1;
        this.updateState();
    }

    changePreselectedOption(numberOfSteps){
        const numberOfFilteredOptions = ( this.getFilteredOptions() ).length;
        this.state.preselectedOption = Math.min( numberOfFilteredOptions-1, Math.max(0,this.state.preselectedOption+numberOfSteps) );
        this.updateState();
    }

    onFocusIn(){
        this.state.hasFocus=true;
        this.updateState();
        this.getAutocompleteOptions();
    }

    onFocusOut(){
        this.state.hasFocus=false;
        this.updateState();
    }
}