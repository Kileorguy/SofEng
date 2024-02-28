import {Entity} from "./entity.js";

export class Enemy extends Entity{
    vx
    constructor(HP,x,y,width,height) {
        super(HP,x,y,width,height);
    }

    drawSelf(ctx){
        ctx.fillStyle = 'red'
        ctx.fillRect(this.x,this.y,this.width,this.height)
    }
}