import {State} from "../state.js";

export class PlayerDefault extends State{
    constructor(player) {
        super();
        // console.log(player)
        this.player = player
    }
    startState() {
        this.player.spriteFrame = 0

    }
    changeState(state) {
        this.player.state = state
        this.player.state.startState()
    }
    updateState(){
    }
}