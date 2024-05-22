import {Entity} from "./entity.js";
import {EnemyIdle} from "../scripts/state/enemyState/enemyIdle.js";
import {EnemySummon} from "../scripts/state/enemyState/enemySummon.js";
import {EnemyMagic} from "../scripts/state/enemyState/enemyMagic.js";
import {EnemyLaser} from "../scripts/state/enemyState/enemyLaser.js";
import {cooldownValidation} from "../helper/frameRateHelper.js";
import { Game } from "../scripts/gameLogic.js";

export class Enemy extends Entity{
    state
    #immune_timer = 0.4
    #immune_counter = 0
    #stateVal = ''
    #spriteLength = 1
    spriteFrame = 0
    #framesCounter = 0
    #framesHold = 8

    /**
     * @param HP : number
     * @param x : number
     * @param y : number
     * @param width : number
     * @param height : number
     */
    constructor(HP,x,y,width,height) {
        super(HP,x,y,width,height);
        this.game = Game.getInstance()
        this.sprites = this.game.facade.image['enemy1']

        // this.state = new EnemyIdle(this)
        this.state = new EnemySummon(this)
        this.vx = 6

    }

    drawSelf(ctx){
        this.#immune_counter++

        if(this.state instanceof EnemyIdle){
            this.#spriteLength = this.sprites['idle']['idle'].length
            this.spriteFrame %= this.sprites['idle']['idle'].length
            ctx.drawImage(this.sprites['idle']['idle'][this.spriteFrame],this.x,this.y,this.width,this.height)
        }else if(this.state instanceof EnemyMagic){
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