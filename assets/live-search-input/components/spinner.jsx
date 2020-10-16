import React from 'react';

class LiveSearchSpinner extends React.Component{

    render(){
        return(
            <svg className="livesearch-icon livesearch-spinner">
                <line x1="50%" y1="0" x2="50%" y2="25%" strokeWidth="1.5"></line>
                <line x1="67.68%" y1="32.32%" x2="85.36%" y2="14.64%" strokeWidth="1.5" opacity="0.9"></line>
                <line x1="75%" y1="50%" x2="100%" y2="50%" strokeWidth="1.5" opacity="0.8"></line>
                <line x1="67.68%" y1="67.68%" x2="85.36%" y2="85.36%" strokeWidth="1.5" opacity="0.7"></line>
                <line x1="50%" y1="75%" x2="50%" y2="100%" strokeWidth="1.5" opacity="0.6"></line>
                <line x1="32.32%" y1="67.68%" x2="14.64%" y2="85.364%" strokeWidth="1.5" opacity="0.5"></line>
                <line x1="25%" y1="50%" x2="0" y2="50%" strokeWidth="1.5" opacity="0.4"></line>
                <line x1="32.32%" y1="32.32%" x2="14.64%" y2="14.64%" strokeWidth="1.5" opacity="0.3"></line>
            </svg>
        );
    }
}

LiveSearchSpinner.propTypes = {};

export default LiveSearchSpinner;