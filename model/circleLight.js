import {Game} from "../scripts/gameLogic.js";
import {cooldownValidation} from "../helper/frameRateHelper.js";

export class CircleLight {
    v = 40
    #cooldown = 1
    #radian = 0
    #counter = 0
    #radius = 15
    follow = true

    constructor(x,y) {
        this.x = x
        this.y = y
        // console.log(x,y)
    }
    move(player){
        let px = player.x + player.width/2
        let py = player.y + player.height/2
        this.#counter++
        if(!cooldownValidation(this.#counter,this.#cooldown)){
            this.#radian = Math.atan2(py-this.y,px-this.x)
        }else{
            this.x += this.v * Math.cos(this.#radian)
            this.y += this.v * Math.sin(this.#radian)
        }

    }

    checkCollision(player){
        let x = this.x
        let y = this.y
        let p = player
        if(x+this.#radius >= p.x && x <= p.x+this.#radius + p.width
            && y+this.#radius >= p.y && y-this.#radius <= p.y + p.height){
            p.takeDamage(3)
            return true
        }
        return x <= 0 - 100 || y <= 0 - 100 || x >= Game.canvasWidth + 100 || y >= Game.canvasHeight + 100;

    }
    drawSelf(ctx){
        ctx.fillStyle = 'cyan'
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.#radius, 0, 2 * Math.PI);
        ctx.fill()
    }
}