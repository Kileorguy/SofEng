import {Entity} from "./entity.js";
import {ctx} from "../pages/js/game.js";

export class Enemy extends Entity{
    constructor(HP,x,y,width,height) {
        super(HP,x,y,width,height);
    }

    drawSelf(){
        ctx.fillStyle = 'red'
        ctx.fillRect(this.x,this.y,this.width,this.height)
    }
}