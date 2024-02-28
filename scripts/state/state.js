export class State{
    constructor() {

    }

    startState(){
        throw new Error("Cannot instantiate abstract class");
    }
    updateState(){
        throw new Error("Cannot instantiate abstract class");
    }
    changeState(){
        throw new Error("Cannot instantiate abstract class");
    }

}