import {Game} from "../scripts/gameLogic.js";
import {cooldownValidation} from "../helper/frameRateHelper.js";

export class CircleLight {
    v = 40
    #cooldown = 1
    #radian = 0
    #counter = 0
    #radius = 50
    follow = true
    #spriteLength = 1
    spriteFrame = 0
    #framesCounter = 0
    #framesHold = 8

    constructor(x,y) {
        this.x = x
        this.y = y
        // console.log(x,y)
        this.game = Game.getInstance()
        this.sprites = this.game.facade.image['circleLight']
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
        
        this.#spriteLength = this.sprites['orb']['orb'].length
        this.spriteFrame %= this.sprites['orb']['orb'].length
        ctx.drawImage(this.sprites['orb']['orb'][this.spriteFrame],this.x,this.y,this.#radius,this.#radius)
        
        this.#framesCounter += 1

        if(this.#framesCounter % this.#framesHold === 0){

            this.spriteFrame = (this.spriteFrame + 1) % this.#spriteLength
        }

    }
}