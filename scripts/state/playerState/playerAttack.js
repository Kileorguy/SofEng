import {State} from "../state.js";
import {PlayerDefault} from "./playerDefault.js";

export class PlayerAttack extends State{

    /**
     *
     * @param player : Player
     */
    constructor(player) {
        super();
        this.player = player
    }
    startState(){
        this.player.attack()
        this.changeState(new PlayerDefault(this.player))
    }

    updateState(){

    }

    changeState(state){
        this.player.state = state
        this.player.state.startState()

    }


}