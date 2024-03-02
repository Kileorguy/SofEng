import {Entity} from "./entity.js";
import {MageIdle} from "../scripts/state/mageState/mageIdle.js";
import {MageAttack} from "../scripts/state/mageState/mageAttack.js";

export class Mage extends Entity {
    constructor(HP,x,y,width,height) {
        super(HP,x,y,width,height);
        this.state = new MageAttack(this)
        this.state.startState()
    }
    move(){
        this.state.updateState()
    }
    drawSelf(ctx){
        ctx.fillStyle = 'magenta'
        ctx.fillRect(this.x,this.y,this.width,this.height)
    }

}