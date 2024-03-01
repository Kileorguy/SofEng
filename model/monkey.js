import {Entity} from "./entity.js";
import {Game} from "../scripts/gameLogic.js";
import * as game from "./enemy.js";

export class Monkey extends Entity{
    #v = 5
    #deltaTime
    #previousTime
    #currentTime
    #timer = 0.8
    #radian = 0
    #counter = 0
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
        this.#currentTime = performance.now()
        this.#previousTime = performance.now()
        this.game = Game.getInstance()
        this.enemy = this.game.enemy
    }

    deathTimer(){
        if(this.#counter >= 60*8) return true
        return false
    }

    move(){
        this.#counter++
        if(this.#counter <= 60*0.2) return
        // console.log(this)

        if(this.x + this.width >= this.enemy.x - 5 && this.x <= this.enemy.x + this.enemy.width+5
            && this.y + this.height >= this.enemy.y - 5 && this.y <= this.enemy.y + this.enemy.height+5
        ){
            this.#deltaTime = 0
            this.#currentTime = performance.now()
            this.#previousTime = performance.now()
            return
        }
        this.#currentTime = performance.now()
        this.#deltaTime = (this.#currentTime - this.#previousTime)/1000

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