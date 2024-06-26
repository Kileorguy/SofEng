import {State} from "../state.js";
import {PlayerDefault} from "./playerDefault.js";
import {Game} from "../../gameLogic.js";

export class PlayerSummon extends State{

    #_timer = 0
    /**
     * @param player
     */
    constructor(player) {
        super();
        // player.vx =0
        // player.vy =0
        player.summon = true
        this.game = Game.getInstance()
        this.player = player
    }

    startState(){
        this.player.spriteFrame = 0
        setTimeout(()=>{
            this.game.initMonkey(this.player.x + this.player.width/2-25,this.player.y-100)
            this.game.initMonkey(this.player.x + this.player.width/2-25,this.player.y+100+this.player.height/2)
        },300)
    }
    updateState(){
        this.#_timer += 1
        // console.log(this.#_timer/60)


        if(this.#_timer>=12*8){
            this.changeState(new PlayerDefault(this.player))
        }

    }
    changeState(state){
        this.player.summon = false
        this.player.state = state
        this.player.state.startState()
    }

}