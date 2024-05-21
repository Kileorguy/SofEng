import {State} from "../state.js";
import {PlayerDefault} from "./playerDefault.js";

export class PlayerBlock extends State{
    #counter = 0
    constructor(player) {
        super();
        this.player = player
    }

    startState() {
        this.player.block = true
        this.player.spriteFrame = 0

    }
    changeState() {
        this.player.block = false
        this.player.state = new PlayerDefault(this.player)
        this.player.state.startState()

    }
    updateState() {
        this.#counter++
        if(this.#counter>=60*0.8) this.changeState()
    }

}