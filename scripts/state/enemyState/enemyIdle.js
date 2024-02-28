import {State} from "../state.js";
import {EnemyWalk} from "./enemyWalk.js";
import {EnemyMagic} from "./enemyMagic.js";

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
        this._timer = Math.random()*2+1
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
        let rand = Math.round(Math.random())+1
        console.log(rand)

        if(rand===1){
            this.Enemy.state = new EnemyWalk(this.Enemy)
        }else if(rand === 2){
            this.Enemy.state = new EnemyMagic(this.Enemy)
        }


        this.Enemy.state.startState()

    }


}