import React from 'react';

class LiveSearchLens extends React.Component{

    render(){
        return(
            <svg className="livesearch-icon livesearch-lens">
                <circle cx="45%" cy="45%" r="33%" strokeWidth="1.5"></circle>
                <line x1="68.33%" y1="68.33%" x2="100%" y2="100%" strokeWidth="1.5"></line>
            </svg>
        );
    }
}

LiveSearchLens.propTypes = {};

export default LiveSearchLens;