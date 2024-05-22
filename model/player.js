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
    #framesHold = 8
    #framesCurr = 0
    #framesMax = 3
    #framesCounter = 0

    #stateVal = 'idle'
    spriteFrame = 0
    #spriteLength = 3

    #dash_cooldown = 0.5
    #dash_counter = 0

    #block_cooldown = 5
    #block_counter = this.#block_cooldown * 60

    #atk_cooldown = 0.5
    #atk_counter = 0

    #immune_timer = 0.2
    #immune_counter = 0

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
        this.sprites = this.game.facade.image['player']
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
                this.spriteFrame = 0
                this.#stateVal = 'move'
                break
            }
            case 'arrowright':{
                if(!atk && !dash && !summon) this.facing = 'd'
                this.vx = this.movementSpeed
                this.keydown = true
                this.spriteFrame = 0
                this.#stateVal = 'move'
                break
            }
            case 'arrowup':{
                if(!atk && !dash && !summon) this.facing = 'w'
                this.vy = -this.movementSpeed
                this.keydown = true
                this.spriteFrame = 0
                this.#stateVal = 'move'
                break
            }
            case 'arrowdown':{
                if(!atk && !dash && !summon) this.facing = 's'
                this.vy = this.movementSpeed

                this.keydown = true
                this.spriteFrame = 0
                this.#stateVal = 'move'
                break
            }
            case 'q':{
                // this.attacking = true
                // setInterval(this.attacking=false,1000)
                if(cooldownValidation(this.#atk_counter, this.#atk_cooldown)){
                    this.state.changeState(new PlayerAttack(this))
                    this.#atk_counter = 0
                    this.spriteFrame = 0
                    this.#stateVal = 'attack'
                }
                break
            }
            case 'w':{
                if(cooldownValidation(this.#dash_counter,this.#dash_cooldown) && !this.dash
                    && !this.block ){
                    this.state.changeState(new PlayerDash(this))
                    this.#dash_counter = 0
                    this.spriteFrame = 0
                    this.#stateVal = 'attack'
                }

                break
            }
            case 'e':{
                if(!this.dash && !this.block)
                this.state.changeState(new PlayerSummon(this))
                this.spriteFrame = 0
                this.#stateVal = 'attack'
                break
            }
            case 'd':{
                if(cooldownValidation(this.#block_counter, this.#block_cooldown) && !this.dash
                    && !this.block){
                    this.state.changeState(new PlayerBlock(this))
                    this.#block_counter = 0
                    this.spriteFrame = 0
                    this.#stateVal = 'attack'
                    // console.log("block")
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
     * @param laser : boolean
     */
    takeDamage(dmg, laser = false){
        if(this.block || this.dash) return
        if(cooldownValidation(this.#immune_counter,this.#immune_timer) || !laser){
            this.HP -= dmg
            this.#immune_counter=0
        }
    }

    checkCollision = (x,y,width,height) =>{
        let game = Game.getInstance()
        let enemy = game.enemy
        let mages = game.mages
        if (x < enemy.x + enemy.width &&
            x + width > enemy.x &&
            y < enemy.y + enemy.height &&
            y + height > enemy.y) {
            enemy.takeDamage(10,true)
        }

        for (let mage of mages) {
            if (
                x < mage.x + mage.width &&
                x + width > mage.x &&
                y < mage.y + mage.height &&
                y + height > mage.y
            ) {
                mage.takeDamage(10,true)
            }
        }


    }
    interval
    drawSelf(ctx){

        // console.log(this.HP)
        if(this.attacking && this.#framesCurr === 2){
            this.attacking = false
            this.#framesCurr=0
            this.#framesElapsed=0
            this.#framesCounter = 0
            this.spriteFrame=0
            this.#stateVal = 'move'
        }
        console.log(this.spriteFrame)
        if(!this.block) ctx.fillStyle = 'blue'
        else ctx.fillStyle = 'cyan'
        // ctx.fillRect(this.x,this.y,this.width,this.height)


        if(this.state instanceof PlayerAttack){
            this.#stateVal = 'attack'
            this.#spriteLength = this.sprites['attack'].length
            ctx.drawImage(this.sprites['attack'][this.spriteFrame],this.x,this.y,this.width,this.height)
        }else if(this.state instanceof PlayerDefault){
            this.#stateVal = 'idle'
            if(this.facing ==='a'){
                this.#spriteLength = this.sprites['idle']['left'].length
                this.spriteFrame %= this.sprites['idle']['left'].length
                ctx.drawImage(this.sprites['idle']['left'][this.spriteFrame],this.x,this.y,this.width,this.height)
            }else if(this.facing ==='d'){
                this.#spriteLength = this.sprites['idle']['right'].length
                this.spriteFrame %= this.sprites['idle']['right'].length
                ctx.drawImage(this.sprites['idle']['right'][this.spriteFrame],this.x,this.y,this.width,this.height)
            }else if(this.facing ==='w'){
                this.#spriteLength = this.sprites['idle']['up'].length
                this.spriteFrame %= this.sprites['idle']['up'].length
                ctx.drawImage(this.sprites['idle']['up'][this.spriteFrame],this.x,this.y,this.width,this.height)
            }else if(this.facing ==='s'){
                this.#spriteLength = this.sprites['idle']['down'].length
                this.spriteFrame %= this.sprites['idle']['down'].length

                ctx.drawImage(this.sprites['idle']['down'][this.spriteFrame],this.x,this.y,this.width,this.height)
            }
        }



        this.#framesCounter += 1

        if(this.#framesCounter % this.#framesHold === 0){
            // if(this.#framesCurr < this.#framesMax - 1){
            // this.#framesCurr+=1

            if(this.#stateVal === 'move'){
                console.log(this.sprites[this.#stateVal]['up'].length)
                this.spriteFrame = (this.spriteFrame + 1) % this.#spriteLength

            }else{
                this.spriteFrame = (this.spriteFrame + 1) % this.#spriteLength

            }

            // }
        }

        if(this.attacking === true) {
            this.#framesElapsed ++;

            if(this.#framesElapsed % this.#framesHold === 0){
                // if(this.#framesCurr < this.#framesMax - 1){
                this.#framesCurr+=1
                // this.spriteFrame+=1
                // this.spriteFrame = (this.spriteFrame + 1) % this.sprites[this.#stateVal].length

                // }
            }
            ctx.fillStyle = 'gray'
            let atkX, atkY,atkW = this.atkW, atkH = this.atkH
            if(this.facing ==='a'){
                atkX = this.x-this.atkW;
                atkY = this.y;
                atkW = this.atkH
                atkH = this.atkW
            }else if(this.facing ==='d'){
                atkX = this.x+this.width;
                atkY = this.y;
                atkW = this.atkH
                atkH = this.atkW
            }else if(this.facing ==='w'){
                atkX = this.x
                atkY = this.y-this.atkW
            }else if(this.facing ==='s'){
                atkX = this.x
                atkY = this.y+this.height
            }
            ctx.fillRect(atkX, atkY,atkH,atkW)
            this.checkCollision(atkX,atkY,atkW,atkH)
        }

    }
     move(){

        this.#dash_counter++; this.#block_counter++; this.#atk_counter++; this.#immune_counter++
        if(this.dash || this.block || this.summon) return
         // priority facing
        let vx = this.vx
        let vy = this.vy
        if(vx!==0 && vy===0 && !this.attacking){
            if (vx>0) this.facing = 'd'
            else this.facing = 'a'
        }
         if(vx===0 && vy!==0 && !this.attacking){
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
