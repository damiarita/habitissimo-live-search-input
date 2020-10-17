export default class GenericStateManager{
    constructor(setStateCallback, stateProperty){
        this.setStateCallback = setStateCallback;
        this.stateProperty = stateProperty;
        this.state={};
    }

    updateState(){
        const stateClone = {...this.state};
        this.setStateCallback({
            [this.stateProperty]: stateClone
        });
    }
}