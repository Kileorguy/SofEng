import {Entity} from "./entity.js";
import {EnemyIdle} from "../scripts/state/enemyState/enemyIdle.js";

export class Enemy extends Entity{
    state
    constructor(HP,x,y,width,height) {
        super(HP,x,y,width,height);
        this.state = new EnemyIdle(this)
        this.vx = 4
    }

    drawSelf(ctx){
        ctx.fillStyle = 'red'
        ctx.fillRect(this.x,this.y,this.width,this.height)
    }
}