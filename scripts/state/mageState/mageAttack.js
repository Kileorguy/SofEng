import {State} from "../state.js";
import {cooldownValidation} from "../../../helper/frameRateHelper.js";
import {MageIdle} from "./mageIdle.js";
import {Game} from "../../gameLogic.js";
import {CircleLight} from "../../../model/circleLight.js";

export class MageAttack extends State {
    #counter
    #cooldown
    /**
     *
     * @param mage : Mage
     */
    constructor(mage) {
        super();
        this.mage = mage
    }
    startState(){
        // console.log("attack")
        this.#counter = 0
        this.#cooldown = 1
    }
    updateState(){
        this.#counter++
        // console.log(this.#counter/60)
        if(cooldownValidation(this.#counter,this.#cooldown)){
            let game = Game.getInstance()
            game.circleLights.push(new CircleLight(this.mage.x+this.mage.width/2,this.mage.y-50))
            this.changeState()
        }
    }
    changeState(){
        this.mage.state = new MageIdle(this.mage)
        this.mage.state.startState()
    }

}