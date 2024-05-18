import {State} from "../state.js";
import {PlayerDefault} from "./playerDefault.js";

export class PlayerAttack extends State{
    #counter = 0
    /**
     *
     * @param player : Player
     */
    constructor(player) {
        super();
        this.player = player
    }
    startState(){
        this.player.spriteFrame = 0
        this.player.attack()
    }

    updateState(){
        this.#counter += 1
        if(this.#counter>=18){
            this.changeState(new PlayerDefault(this.player))
        }


    }

    changeState(state){
        this.player.state = state
        this.player.state.startState()

    }


}