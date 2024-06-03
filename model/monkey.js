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
    #stateVal = ''
    #spriteLength = 1
    spriteFrame = 0
    #framesCounter = 0
    #framesHold = 8

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
        this.sprites = this.game.facade.image['monkey']
        this.sounds = this.game.sfacade.sounds['monkey']
        this.enemy = this.game.enemy
    }

    deathTimer(){
        if(this.HP <= 0) return true
        return this.#counter >= 60 * 8;
    }

    playExist_Sound = () => 
    {
        let Sound;
        Sound = this.sounds['move']['sound'];

        if (Sound.length > 0) 
            {
            
            // FOR SINGLE SOUNDS
            const audio = Sound[0];

            audio.playbackRate = 2
            audio.volume = 0.1;
            audio.play();
        } else {
            console.error('No sound available.');
        }
    }

    playBite_Sound = () => 
    {
        let Sound;
        Sound = this.sounds['attack']['sound'];

        if (Sound.length > 0) 
            {
            
            // FOR SINGLE SOUNDS
            const audio = Sound[0];

            audio.playbackRate = 2
            audio.volume = 0.3;
            audio.play();
        } else {
            console.error('No sound available.');
        }
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

                this.playBite_Sound();
                this.state = 'attack'
                this.#dmg_counter=0
            }
            return
        }else{
            this.state = 'move'
        }

        this.ex = this.enemy.x + this.enemy.width/2
        this.ey = this.enemy.y + this.enemy.height/2

        this.#radian = Math.atan2(this.ey - this.y, this.ex - this.x);
        let speedX = Math.floor(this.#v*Math.cos(this.#radian))
        this.x += speedX
        this.y += Math.floor(this.#v*Math.sin(this.#radian))

        if(speedX > 0)
        {
            this.#stateVal = 'right'
        }
        else
        {
            this.#stateVal = 'left'
        }
    }

    drawSelf(ctx){
        
        if(this.state == 'move'){
            this.playExist_Sound()
            if(this.#stateVal == 'right')
            {
                this.#spriteLength = this.sprites['move']['right'].length
                this.spriteFrame %= this.sprites['move']['right'].length
                ctx.drawImage(this.sprites['move']['right'][this.spriteFrame],this.x,this.y,this.width,this.height)
            }
            else if(this.#stateVal == 'left')
            {
                this.#spriteLength = this.sprites['move']['left'].length
                this.spriteFrame %= this.sprites['move']['left'].length
                ctx.drawImage(this.sprites['move']['left'][this.spriteFrame],this.x,this.y,this.width,this.height)
            }
            
        }else if(this.state = 'attack'){
            if(this.#stateVal == 'right')
            {
                this.#spriteLength = this.sprites['attack']['right'].length
                this.spriteFrame %= this.sprites['attack']['right'].length
                ctx.drawImage(this.sprites['attack']['right'][this.spriteFrame],this.x,this.y,this.width,this.height)
            }
            else if(this.#stateVal == 'left')
            {
                this.#spriteLength = this.sprites['attack']['left'].length
                this.spriteFrame %= this.sprites['attack']['left'].length
                ctx.drawImage(this.sprites['attack']['left'][this.spriteFrame],this.x,this.y,this.width,this.height)
            }
        }

        this.#framesCounter += 1

        if(this.#framesCounter % this.#framesHold === 0){

            this.spriteFrame = (this.spriteFrame + 1) % this.#spriteLength
        }
    }
}