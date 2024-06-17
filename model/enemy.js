import {Entity} from "./entity.js";
import {EnemyIdle} from "../scripts/state/enemyState/enemyIdle.js";
import {EnemySummon} from "../scripts/state/enemyState/enemySummon.js";
import {EnemyMagic} from "../scripts/state/enemyState/enemyMagic.js";
import {EnemyLaser} from "../scripts/state/enemyState/enemyLaser.js";
import {cooldownValidation} from "../helper/frameRateHelper.js";
import { Game } from "../scripts/gameLogic.js";
import {EnemyWalk} from "../scripts/state/enemyState/enemyWalk.js";
import {FirstGameState} from "../scripts/state/gameState/firstGameState.js";
import {SecondGameState} from "../scripts/state/gameState/secondGameState.js";

export class Enemy extends Entity{
    state
    #immune_timer = 0.48
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

        if(this.game.state instanceof FirstGameState){
            // IF PHASE 1
            this.sprites = this.game.facade.image['enemy1']
            this.sounds = this.game.sfacade.sounds['enemy1']
        }else if(this.game.state instanceof SecondGameState){
            this.sprites = this.game.facade.image['enemy2']
            this.sounds = this.game.sfacade.sounds['enemy2']
        }else{
            this.sprites = this.game.facade.image['enemy3']
            this.sounds = this.game.sfacade.sounds['enemy3']
        }



        // IF PHASE 2


        // IF PHASE 3


        this.state = new EnemyIdle(this)
        // this.state = new EnemyLaser(this)
        this.vx = 6

    }

    playAttack_Sound = () => 
    {
        let Sound;
        Sound = this.sounds['attack']['sound'];

        if (Sound.length > 0) 
            {
            
            // FOR SINGLE SOUNDS
            const audio = Sound[0];

            audio.playbackRate = 5
            audio.volume = 0.1;
            audio.play();
        } else {
            console.error('No sound available.');
        }
    }

    drawSelf(ctx){
        // console.log(this.state)

        this.#immune_counter++


        // IF PHASE 1
        if(this.game.state instanceof FirstGameState){
            if(this.state instanceof EnemyIdle || this.state instanceof EnemyWalk || this.state instanceof EnemySummon){
                this.#spriteLength = this.sprites['idle']['idle'].length
                this.spriteFrame %= this.sprites['idle']['idle'].length
                ctx.drawImage(this.sprites['idle']['idle'][this.spriteFrame],this.x,this.y,this.width,this.height)
            }else if(this.state instanceof EnemyMagic ){
                this.playAttack_Sound()
                this.#spriteLength = this.sprites['attack']['attack'].length
                this.spriteFrame %= this.sprites['attack']['attack'].length
                ctx.drawImage(this.sprites['attack']['attack'][this.spriteFrame],this.x,this.y,this.width,this.height)
            }


        }else if(this.game.state instanceof SecondGameState){
            // IF PHASE 2
            if(this.state instanceof EnemyIdle || this.state instanceof EnemyWalk){
                this.#spriteLength = this.sprites['idle']['idle'].length
                this.spriteFrame %= this.sprites['idle']['idle'].length
                ctx.drawImage(this.sprites['idle']['idle'][this.spriteFrame],this.x,this.y,this.width,this.height)
            }else if(this.state instanceof EnemyMagic ){
                this.playAttack_Sound()
                this.#spriteLength = this.sprites['attack']['attack'].length
                this.spriteFrame %= this.sprites['attack']['attack'].length
                ctx.drawImage(this.sprites['attack']['attack'][this.spriteFrame],this.x,this.y,this.width,this.height)
            }
            else if(this.state instanceof EnemySummon){
                this.#spriteLength = this.sprites['summon']['summon'].length
                this.spriteFrame %= this.sprites['summon']['summon'].length
                ctx.drawImage(this.sprites['summon']['summon'][this.spriteFrame],this.x,this.y,this.width,this.height)
            }
        }else{
            // IF PHASE 3
            if(this.state instanceof EnemyIdle || this.state instanceof EnemyWalk){
                this.#spriteLength = this.sprites['idle']['idle'].length
                this.spriteFrame %= this.sprites['idle']['idle'].length
                ctx.drawImage(this.sprites['idle']['idle'][this.spriteFrame],this.x,this.y,this.width,this.height)
            }else if(this.state instanceof EnemyMagic ){
                this.playAttack_Sound()
                this.#spriteLength = this.sprites['attack']['attack'].length
                this.spriteFrame %= this.sprites['attack']['attack'].length
                ctx.drawImage(this.sprites['attack']['attack'][this.spriteFrame],this.x,this.y,this.width,this.height)
            }
            else if(this.state instanceof EnemySummon){
                this.#spriteLength = this.sprites['summon']['summon'].length
                this.spriteFrame %= this.sprites['summon']['summon'].length
                ctx.drawImage(this.sprites['summon']['summon'][this.spriteFrame],this.x,this.y,this.width,this.height)
            }
            else if(this.state instanceof EnemyLaser){
                this.#spriteLength = this.sprites['laser']['laser'].length
                this.spriteFrame %= this.sprites['laser']['laser'].length
                ctx.drawImage(this.sprites['laser']['laser'][this.spriteFrame],this.x,this.y,this.width,this.height)
            }
        }

        this.#framesCounter += 1

        if(this.#framesCounter % this.#framesHold === 0){

            this.spriteFrame = (this.spriteFrame + 1) % this.#spriteLength
        }


    }

    takeDamage(hp, player = false, monkey = false){
        if(cooldownValidation(this.#immune_counter,this.#immune_timer) || monkey){
            this.HP -= hp
            this.#immune_counter=0
            if(player){
                this.game.player.increaseCounter()
            }
        }
    }
}