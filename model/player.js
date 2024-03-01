import {Entity} from "./entity.js";
import {Game} from "../scripts/gameLogic.js";
import {PlayerDefault} from "../scripts/state/playerState/playerDefault.js";
import {horizontalCollision, verticalCollision} from "../helper/distanceHelper.js";
import {PlayerAttack} from "../scripts/state/playerState/playerAttack.js";
import {PlayerDash} from "../scripts/state/playerState/playerDash.js";
import {PlayerSummon} from "../scripts/state/playerState/playerSummon.js";
import {PlayerBlock} from "../scripts/state/playerState/playerBlock.js";
import {cooldownValidation} from "../helper/frameRateHelper.js";

export class Player extends Entity{
    movementSpeed = 8
    #framesElapsed = 0
    #framesHold = 6
    #framesCurr = 0
    #framesMax = 3

    #dash_cooldown = 0.5
    #dash_counter = 0

    #block_cooldown = 5
    #block_counter = 0

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
        this.summon = false
        this.game = Game.getInstance()
        this.keydownListener = this.keydownListener.bind(this);
        this.keyupListener = this.keyupListener.bind(this);
        document.addEventListener('keydown', this.keydownListener);
        document.addEventListener('keyup', this.keyupListener);
    }

    keydownListener(event) {
        let atk = this.attacking
        let dash = this.dash
        let summon = this.summon
        // console.log(dash)
        // console.log(this)
        let key = event.key;
        key = key.toLowerCase()
        // console.log(key)
        switch (key) {
            case 'arrowleft':{
                // setPlayer
                if(!atk && !dash && !summon) this.facing = 'a'
                this.vx = -this.movementSpeed
                this.keydown = true
                break
            }
            case 'arrowright':{
                if(!atk && !dash && !summon) this.facing = 'd'
                this.vx = this.movementSpeed
                this.keydown = true
                break
            }
            case 'arrowup':{
                if(!atk && !dash && !summon) this.facing = 'w'
                this.vy = -this.movementSpeed
                this.keydown = true
                break
            }
            case 'arrowdown':{
                if(!atk && !dash && !summon) this.facing = 's'
                this.vy = this.movementSpeed

                this.keydown = true
                break
            }
            case 'q':{
                // this.attacking = true
                // setInterval(this.attacking=false,1000)

                this.state.changeState(new PlayerAttack(this))
                break
            }
            case 'w':{
                if(cooldownValidation(this.#dash_counter,this.#dash_cooldown)){
                    this.state.changeState(new PlayerDash(this))
                    this.#dash_counter = 0
                }

                break
            }
            case 'e':{
                this.state.changeState(new PlayerSummon(this))
                break
            }
            case 'd':{
                if(cooldownValidation(this.#block_counter, this.#block_cooldown)){
                    this.state.changeState(new PlayerBlock(this))
                    this.#block_counter = 0
                    console.log("block")
                }
                break
            }
        }
    }
    keyupListener(event) {
        let key = event.key;
        key = key.toLowerCase()
        switch (key) {
            case 'arrowleft':{
                if(this.vx === -this.movementSpeed){
                    this.vx = 0
                }
                break
            }
            case 'arrowright':{

                if(this.vx === this.movementSpeed){
                    this.vx = 0
                }
                break
            }
            case 'arrowup':{
                if(this.vy === -this.movementSpeed){
                    this.vy = 0
                }
                break
            }
            case 'arrowdown':{
                if(this.vy === this.movementSpeed){
                    this.vy = 0
                }
                break
            }
        }
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
        // console.log(this.HP)
        if(this.attacking && this.#framesCurr === 2){
            this.attacking = false
            this.#framesCurr=0
            this.#framesElapsed=0
        }

        // console.log(this.attacking)
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.x,this.y,this.width,this.height)

        if(this.attacking === false) return

        this.#framesElapsed ++;

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
        this.#dash_counter++
         this.#block_counter++
        if(this.dash || this.block || this.summon) return
         // priority facing
        let vx = this.vx
        let vy = this.vy
        if(vx!==0 && vy===0){
            if (vx>0) this.facing = 'd'
            else this.facing = 'a'
        }
         if(vx===0 && vy!==0){
             if (vy>0) this.facing = 's'
             else this.facing = 'w'
         }
        if(!horizontalCollision(this.x+this.vx,this.width)){
            this.x += this.vx
        }
        if(!verticalCollision(this.y+this.vy,this.height)){
            this.y  += this.vy
        }
    }


}
