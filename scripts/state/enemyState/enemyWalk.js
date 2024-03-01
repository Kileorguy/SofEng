import {State} from "../state.js";
import {Game} from "../../gameLogic.js";
import {EnemyIdle} from "./enemyIdle.js";

export class EnemyWalk extends State{
    #_destX
    #_destY
    #_deltaTime
    #_previousTime
    _currentTime

    constructor(Enemy) {
        super();
        this.Enemy= Enemy
    }

    moveManhattan(){
        let x,y
        x = this.Enemy.x
        y = this.Enemy.y
        let distX = Math.abs(this.#_destX - this.Enemy.x)
        let distY = Math.abs(this.#_destY - this.Enemy.y)


        // 1400


        if(x < this.#_destX){
            if(distX > 10 ){
                this.Enemy.x += Math.round(this.Enemy.vx)
            }
        }else{
            if(distX > 10 ){
                this.Enemy.x -= Math.round(this.Enemy.vx)
            }
        }
        //
        if(y < this.#_destY){
            if(distY > 10){
                this.Enemy.y += Math.round(this.Enemy.vx)
            }
        }else{
            if(distY > 10){
                this.Enemy.y -= Math.round(this.Enemy.vx)
            }
        }

    }
    startState(){
        this.#_previousTime = performance.now()
        this._currentTime = performance.now()
        let w = this.Enemy.width
        let h = this.Enemy.height

        this.#_destX = Math.floor(Math.random() * (Game.canvasWidth - w))
        this.#_destY = Math.floor(Math.random() * (Game.canvasHeight - h))
    }
    change = () =>{ this.changeState()}
    updateState(){

        this._currentTime = performance.now();
        this.#_deltaTime = (this._currentTime - this.#_previousTime) / 1000;
        this.moveManhattan()

        let distX = Math.abs(this.#_destX - this.Enemy.x)
        let distY = Math.abs(this.#_destY - this.Enemy.y)
        if(distX < 20 && distY < 20){
            this.change()
        }
    }
    changeState(){
        this.Enemy.state = new EnemyIdle(this.Enemy)
        this.Enemy.state.startState()
    }
}