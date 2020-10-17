import React from 'react';

class TransparentComponent extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return this.props.children;
    }
}
TransparentComponent.propTypes = {};

export default TransparentComponent;