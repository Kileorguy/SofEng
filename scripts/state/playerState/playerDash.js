import {State} from "../state.js";
import {PlayerDefault} from "./playerDefault.js";
import {horizontalCollision, verticalCollision} from "../../../helper/distanceHelper.js";

export class PlayerDash extends State {

    #multiplier
    #timer = 0
    /**
     *
     * @param player : Player
     */
    constructor(player) {
        player.dash = true
        super();
        this.player = player
        this.#multiplier = 3.5
        this.v = 0
    }
    startState(){
        this.v = this.player.movementSpeed*this.#multiplier

    }
    updateState(){
        this.#timer++
        let facing = this.player.facing
        let v = this.v
        let x = this.player.x
        let y = this.player.y
        let w = this.player.width
        let h = this.player.height
        if(facing === 'a'){
            if(!horizontalCollision(x-v,w))
            this.player.x -= v
        }else if(facing === 'd'){
            if(!horizontalCollision(x+v,w))
            this.player.x += v
        }else if(facing === 'w'){
            if(!verticalCollision(y-v,h))
            this.player.y -= v
        }else if(facing === 's'){
            if(!verticalCollision(y+v,h))
            this.player.y += v
        }

        if(this.#timer >= 60*0.15){
            this.changeState(new PlayerDefault(this.player))
        }
    }

    changeState(state){
        this.player.dash = false
        this.player.state = state
        this.player.state.startState()
    }

}