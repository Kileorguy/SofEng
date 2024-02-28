import {Entity} from "./entity.js";

export class Monkey extends Entity{
    constructor(HP,x,y,width,height) {
        super(HP,x,y,width,height);

    }
    drawSelf(ctx){
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.x,this.y,this.width,this.height)
    }
}