import {State} from "../state.js";
import {cooldownValidation} from "../../../helper/frameRateHelper.js";
import {MageAttack} from "./mageAttack.js";

export class MageIdle extends State {

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
        this.#counter = 0
        this.#cooldown = Math.round(Math.random()*3+5)
    }
    changeState(){
        this.mage.state = new MageAttack(this.mage)
        this.mage.state.startState()
    }
    updateState(){
        this.#counter++
        // console.log(this.#counter/60)
        if(cooldownValidation(this.#counter,this.#cooldown)){
            this.changeState()
        }
    }
}