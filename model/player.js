import {Entity} from "./entity.js";
import {Game} from "../scripts/gameLogic.js";
import {PlayerDefault} from "../scripts/state/playerState/playerDefault.js";
import {horizontalCollision, verticalCollision} from "../helper/distanceHelper.js";

export class Player extends Entity{
    movementSpeed = 8
    #framesElapsed = 0
    #framesHold = 6
    #framesCurr = 0
    #framesMax = 3

    /**
     *
     * @param HP : number
     * @param x : number
     * @param y : number
     * @param width : number
     * @param height : number
     * @param atkW : number
     * @param atkH : number
     */
    constructor(HP,x,y,width,height,atkW,atkH) {
        super(HP,x,y,width,height);
        this.atkW = atkW
        this.atkH = atkH
        this.facing = 's'
        this.state = new PlayerDefault(this)
        this.attacking = false
        this.vy =0
        this.vx =0
        this.#framesCurr = 0
        this.dash = false
        this.block = false
        this.game = Game.getInstance()
    }
    attack(){
        this.attacking = true
    }

    /**
     *
     * @param dmg : number
     */
    takeDamage(dmg){
        if(this.block || this.dash) return
        this.HP -= dmg
    }


    interval
    drawSelf(ctx){
        console.log(this.HP)
        if(this.attacking && this.#framesCurr === 2){
            this.attacking = false
            this.#framesCurr=0
            this.#framesElapsed=0
        }

        // console.log(this.attacking)
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.x,this.y,this.width,this.height)

        if(this.attacking === false) return

        this.#framesElapsed ++

        if(this.#framesElapsed % this.#framesHold === 0){

            // console.log(this.#framesElapsed,this.#framesCurr,this.#framesMax-1,this.#framesHold)
            if(this.#framesCurr < this.#framesMax - 1){
                this.#framesCurr+=1
            }else{
                // this.#framesCurr=0
            }
        }
        ctx.fillStyle = 'gray'

        if(this.facing ==='a'){
            let atkX = this.x-this.atkW;
            let atkY = this.y;
            ctx.fillRect(atkX, atkY, this.atkW,this.atkH)
        }else if(this.facing ==='d'){
            let atkX = this.x+this.width;
            let atkY = this.y;
            ctx.fillRect(atkX, atkY, this.atkW,this.atkH)
        }else if(this.facing ==='w'){
            let atkX = this.x
            let atkY = this.y-this.atkW
            ctx.fillRect(atkX, atkY,this.atkH,this.atkW)
        }else if(this.facing ==='s'){
            let atkX = this.x
            let atkY = this.y+this.height
            ctx.fillRect(atkX, atkY,this.atkH,this.atkW)
        }

    }
     move(){
        if(this.dash || this.block) return
        if(!horizontalCollision(this.x+this.vx,this.width)){
            this.x += this.vx
        }
        if(!verticalCollision(this.y+this.vy,this.height)){
            this.y  += this.vy
        }
    }
}
