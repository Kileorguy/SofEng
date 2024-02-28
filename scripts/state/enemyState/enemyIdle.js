import {State} from "../state.js";
import {EnemyWalk} from "./enemyWalk.js";

export class EnemyIdle extends State{
    _timer
    _deltaTime
    _previousTime
    _currentTime
    constructor(Enemy) {
        super();
        this.Enemy= Enemy
    }
    change
    startState(){
        this._previousTime = performance.now()
        this._currentTime = performance.now()
        this._timer = Math.random()*3+3
        this.change = () =>{this.changeState()}

    }
    updateState(){
        this._currentTime = performance.now();
        this._deltaTime = (this._currentTime - this._previousTime) / 1000;
        if(this._deltaTime>this._timer){
            this.change()
        }
    }
    changeState(){
        this.Enemy.state = new EnemyWalk(this.Enemy)
        this.Enemy.state.startState()
    }


}