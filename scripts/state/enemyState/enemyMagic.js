import {State} from "../state.js";
import {Game} from "../../gameLogic.js";
import {EnemyIdle} from "./enemyIdle.js";

export class EnemyMagic extends State{

    constructor(Enemy) {
        super();
        this.Enemy= Enemy
    }
    change = () =>{
        this.Enemy.state = new EnemyIdle(this.Enemy)
        this.Enemy.state.startState()
    }
    startState(){
        let game = Game.getInstance()
        game.initMagic(this.Enemy.x+this.Enemy.width/2,this.Enemy.y-50)
        game.initMagic(this.Enemy.x+this.Enemy.width/2,this.Enemy.y+this.Enemy.height+50)
        game.initMagic(this.Enemy.x-50,this.Enemy.y+this.Enemy.height/2)
        game.initMagic(this.Enemy.x + this.Enemy.width +50,this.Enemy.y+this.Enemy.height/2)

        this.changeState()
    }
    updateState(){
    }
    changeState(){
        setTimeout(this.change, 2000);
    }
}