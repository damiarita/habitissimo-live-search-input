import React from 'react';
import PropTypes from 'prop-types';
import LiveSearchUiKit from '../../live-search-input/components/ui-kit';
import LiveSearchStateManager from '../../live-search-input/entities/state-manager';

class SamplePage extends React.Component{
    constructor(props){
        super(props);

        this.liveSearchStateManager = new LiveSearchStateManager(
            this.setState.bind(this),
            'liveSearch',
            props.habitissimoApiUrl,
            function(id, normalizedName, name){console.log(id, normalizedName, name);} //As an example, we just console.log If this component has to interact with others when a option is selected, this is the place
            );

        this.state={
            liveSearch: this.liveSearchStateManager.state,
        };
    }

    render(){
        return (
        <LiveSearchUiKit
            labelContent={this.props.liveSearchLabelContent}
            inputPlaceHolder={this.props.liveSearchInputPlaceHolder}
            inputId='live-search-input'
            filteredOptions={this.liveSearchStateManager.getFilteredOptions()}
            isLoading={this.state.liveSearch.isLoading}
            inputContent={this.state.liveSearch.inputContent}
            minNumChars={1}
            onInputContentChange={this.liveSearchStateManager.onInputContentChange}
            onFocusIn={this.liveSearchStateManager.onFocusIn}
            onFocusOut={this.liveSearchStateManager.onFocusOut}
            hasFocus={this.state.liveSearch.hasFocus}
            preSelectedOption={this.state.liveSearch.preselectedOption}
            changePreselectedOption={this.liveSearchStateManager.changePreselectedOption}
            optionChildNameFormat={this.props.liveSearchOptionChildNameFormat}
        />
        );
    }
}
SamplePage.propTypes = {
    habitissimoApiUrl: PropTypes.string.isRequired,
    liveSearchLabelContent: PropTypes.string.isRequired,
    liveSearchInputPlaceHolder: PropTypes.string.isRequired,
    liveSearchOptionChildNameFormat: PropTypes.string.isRequired,
  };

export default SamplePage;