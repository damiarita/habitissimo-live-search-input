import React from 'react';
import PropTypes from 'prop-types';

class LiveSearchList extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <ul className={'livesearch-list' + ( this.props.isHidden?' livesearch-list-hidden':'' )}>
                {this.props.children}
            </ul>
        );
    }
}


LiveSearchList.propTypes = {
    isHidden: PropTypes.bool.isRequired,
  };

export default LiveSearchList;