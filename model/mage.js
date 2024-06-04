import {Entity} from "./entity.js";
import {MageIdle} from "../scripts/state/mageState/mageIdle.js";
import {MageAttack} from "../scripts/state/mageState/mageAttack.js";
import {cooldownValidation} from "../helper/frameRateHelper.js";
import { Game } from "../scripts/gameLogic.js";

export class Mage extends Entity {
    constructor(HP,x,y,width,height) {
        super(HP,x,y,width,height);
        this.game = Game.getInstance()
        this.sprites = this.game.facade.image['mage']
        this.sounds = this.game.sfacade.sounds['mage']
        this.state = new MageAttack(this)
        this.state.startState()
    }
    #immune_timer = 0.4
    #immune_counter = 0
    #stateVal = ''
    #spriteLength = 1
    spriteFrame = 0
    #framesCounter = 0
    #framesHold = 8

    
    playAttack_Sound = () => 
    {
        let Sound;
        Sound = this.sounds['attack']['sound'];

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


    move(){
        this.#immune_counter+=1

        this.state.updateState()
    }
    drawSelf(ctx){
        if(this.state instanceof MageIdle){
            this.#spriteLength = this.sprites['idle']['idle'].length
            this.spriteFrame %= this.sprites['idle']['idle'].length
            ctx.drawImage(this.sprites['idle']['idle'][this.spriteFrame],this.x,this.y,this.width,this.height)
        }else if(this.state instanceof MageAttack){
            this.playAttack_Sound()
            this.#spriteLength = this.sprites['attack']['attack'].length
            this.spriteFrame %= this.sprites['attack']['attack'].length
            ctx.drawImage(this.sprites['attack']['attack'][this.spriteFrame],this.x,this.y,this.width,this.height)
        }

        this.#framesCounter += 1

        if(this.#framesCounter % this.#framesHold === 0){

            this.spriteFrame = (this.spriteFrame + 1) % this.#spriteLength
        }
    }
    takeDamage(hp, continuous = false){
        if(cooldownValidation(this.#immune_counter,this.#immune_timer) || !continuous){
            this.HP -= hp
            this.#immune_counter=0
        }
    }

}