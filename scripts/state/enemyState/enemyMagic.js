import {State} from "../state.js";
import {Game} from "../../gameLogic.js";
import {EnemyIdle} from "./enemyIdle.js";

export class EnemyMagic extends State{

    constructor(Enemy) {
        super();
        this.Enemy= Enemy
    }

    startState(){
        let game = Game.getInstance()
        game.initMagic(this.Enemy.x,this.Enemy.y-50)
        game.initMagic(this.Enemy.x,this.Enemy.y+this.Enemy.height+50)
    }
    updateState(){
        this.changeState()
    }
    changeState(){
        this.Enemy.state = new EnemyIdle(this.Enemy)
        this.Enemy.state.startState()
    }
}