import {Entity} from "./entity.js";
import {EnemyIdle} from "../scripts/state/enemyState/enemyIdle.js";
import {EnemySummon} from "../scripts/state/enemyState/enemySummon.js";
import {EnemyMagic} from "../scripts/state/enemyState/enemyMagic.js";
import {EnemyLaser} from "../scripts/state/enemyState/enemyLaser.js";
import {cooldownValidation} from "../helper/frameRateHelper.js";

export class Enemy extends Entity{
    state
    #immune_timer = 0.2
    #immune_counter = 0

    /**
     * @param HP : number
     * @param x : number
     * @param y : number
     * @param width : number
     * @param height : number
     */
    constructor(HP,x,y,width,height) {
        super(HP,x,y,width,height);
        // this.state = new EnemyIdle(this)
        // this.state = new EnemyLaser(this)
        this.state = new EnemySummon(this)
        // this.state = new EnemyMagic(this)
        this.vx = 6

    }

    drawSelf(ctx){
        ctx.fillStyle = 'red'
        ctx.fillRect(this.x,this.y,this.width,this.height)
        this.#immune_counter++
    }

    takeDamage(hp, continuous = false){
        if(cooldownValidation(this.#immune_counter,this.#immune_timer) || !continuous){
            this.HP -= hp
            this.#immune_counter=0
        }
    }
}