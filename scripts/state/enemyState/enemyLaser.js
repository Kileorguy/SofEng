import {State} from "../state.js";
import {cooldownValidation} from "../../../helper/frameRateHelper.js";
import {EnemyIdle} from "./enemyIdle.js";
import {Game} from "../../gameLogic.js";
import {Laser} from "../../../model/laser.js";

export class EnemyLaser extends State{

    #counter
    #duration
    #start
    laser

    constructor(enemy) {
        super();
        this.enemy = enemy
        this.game = Game.getInstance()
    }

    startState(){
        this.#counter = 0
        this.#duration = 3 // detik
        this.#start = 0.5
        let enemy = this.game.enemy

        this.laser = new Laser(enemy.x + enemy.width, enemy.y + enemy.height/2)

    }
    updateState(){
        this.#counter++
        let counter = this.#counter


        if(cooldownValidation(counter,this.#start)){
            this.game.laser = this.laser

            if(cooldownValidation(counter,this.#start+this.#duration)){
                this.game.laser = null
                this.changeState()
            }
        }

    }
    changeState(){
        this.enemy.state = new EnemyIdle(this.enemy)
        this.enemy.state.startState()
    }

}