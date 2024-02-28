import {Entity} from "./entity.js";
import {Game} from "../scripts/gameLogic.js";

export class Player extends Entity{
    vy =0
    vx =0
    constructor(HP,x,y,width,height,atkW,atkH) {
        super(HP,x,y,width,height);
        this.atkW = atkW
        this.atkH = atkH
        this.facing = 's'
    }
    drawSelf(ctx){
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.x,this.y,this.width,this.height)

        if(this.facing ==='a'){
            ctx.fillStyle = 'gray'
            let atkX = this.x-this.atkW;
            let atkY = this.y;
            ctx.fillRect(atkX, atkY, this.atkW,this.atkH)
        }else if(this.facing ==='d'){
            ctx.fillStyle = 'gray'
            let atkX = this.x+this.width;
            let atkY = this.y;
            ctx.fillRect(atkX, atkY, this.atkW,this.atkH)
        }else if(this.facing ==='w'){
            ctx.fillStyle = 'gray'
            let atkX = this.x
            let atkY = this.y-this.atkW
            ctx.fillRect(atkX, atkY,this.atkH,this.atkW)
        }else if(this.facing ==='s'){
            ctx.fillStyle = 'gray'
            let atkX = this.x
            let atkY = this.y+this.height
            ctx.fillRect(atkX, atkY,this.atkH,this.atkW)
        }
    }
     horizontalCollision(x){
        let width = this.width
         console.log(Game.canvasWidth)
        return x <= 0  || x >=  Game.canvasWidth - width;

    }
     verticalCollision(y){
        let height = this.height
        return y <= 0 || y >= Game.canvasHeight - height;
    }
     move(){
        if(!this.horizontalCollision(this.x+this.vx)){
            this.x += this.vx
        }
        if(!this.verticalCollision(this.y+this.vy)){
            this.y  += this.vy
        }
    }
}
