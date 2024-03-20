import {Entity} from "./entity.js";
import {Game} from "../scripts/gameLogic.js";
import * as game from "./enemy.js";
import {cooldownValidation} from "../helper/frameRateHelper.js";

export class Monkey extends Entity{
    #v = 5
    #timer = 0.8
    #radian = 0
    #counter = 0
    #dmg_counter = 0
    #dmg_timer = 1
    /**
     *
     * @param HP : number
     * @param x : number
     * @param y : number
     * @param width : number
     * @param height : number
     */
    constructor(HP,x,y,width,height) {
        super(HP,x,y,width,height);
        this.game = Game.getInstance()
        this.enemy = this.game.enemy
    }

    deathTimer(){
        if(this.HP <= 0) return true
        return this.#counter >= 60 * 8;
    }

    move(){
        this.#counter++
        this.#dmg_counter++

        if(this.#counter <= 60*0.2) return

        if(this.x + this.width >= this.enemy.x - 5 && this.x <= this.enemy.x + this.enemy.width+5
            && this.y + this.height >= this.enemy.y - 5 && this.y <= this.enemy.y + this.enemy.height+5
        ){


            // console.log(this.#dmg_counter,this.#dmg_timer,cooldownValidation(this.#dmg_counter,this.#dmg_timer))
            if(cooldownValidation(this.#dmg_counter,this.#dmg_timer)){
                this.enemy.takeDamage(4)
                this.#dmg_counter=0
            }
            return
        }

        this.ex = this.enemy.x + this.enemy.width/2
        this.ey = this.enemy.y + this.enemy.height/2

        this.#radian = Math.atan2(this.ey - this.y, this.ex - this.x);
        this.x += Math.floor(this.#v*Math.cos(this.#radian))
        this.y += Math.floor(this.#v*Math.sin(this.#radian))
    }
    drawSelf(ctx){
        ctx.fillStyle = 'cyan'
        ctx.fillRect(this.x,this.y,this.width,this.height)
    }
}