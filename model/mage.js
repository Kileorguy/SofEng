import {Entity} from "./entity.js";
import {MageIdle} from "../scripts/state/mageState/mageIdle.js";
import {MageAttack} from "../scripts/state/mageState/mageAttack.js";
import {cooldownValidation} from "../helper/frameRateHelper.js";

export class Mage extends Entity {
    constructor(HP,x,y,width,height) {
        super(HP,x,y,width,height);
        this.state = new MageAttack(this)
        this.state.startState()
    }
    #immune_timer = 0.2
    #immune_counter = 0
    move(){
        this.state.updateState()
    }
    drawSelf(ctx){
        this.#immune_counter++
        ctx.fillStyle = 'magenta'
        ctx.fillRect(this.x,this.y,this.width,this.height)
        ctx.fillStyle = 'purple'
        ctx.fillText(this.HP,this.x,this.y-20,100,100)
    }
    takeDamage(hp, continuous = false){
        if(cooldownValidation(this.#immune_counter,this.#immune_timer) || !continuous){
            this.HP -= hp
            this.#immune_counter=0
        }
    }

}