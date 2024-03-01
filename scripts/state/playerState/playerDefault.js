import {State} from "../state.js";

export class PlayerDefault extends State{
    constructor(player) {
        super();
        // console.log(player)
        this.player = player
        this.moveSpeed = player.movementSpeed
        // this.keydownListener = this.keydownListener.bind(this);
        // this.keyupListener = this.keyupListener.bind(this);
    }

    key


    startState() {
        // document.addEventListener('keydown', this.keydownListener);
        // document.addEventListener('keyup', this.keyupListener);
        // this.player.vx = 0
        // this.player.vy = 0
    }
    changeState(state) {
        // document.removeEventListener('keydown', this.keydownListener);
        // document.removeEventListener('keyup', this.keyupListener);

        this.player.state = state
        this.player.state.startState()
    }
    updateState(){
    }
}