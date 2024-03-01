import {State} from "../state.js";
import {EnemyWalk} from "./enemyWalk.js";
import {EnemyMagic} from "./enemyMagic.js";

export class EnemyIdle extends State{
    #_timer
    #_deltaTime
    #_previousTime
    #_currentTime
    #_cooldown = 0
    constructor(Enemy) {
        super();
        this.Enemy= Enemy
    }
    change
    startState(){
        // this.#_previousTime = performance.now()
        // this.#_currentTime = performance.now()
        this.#_timer = Math.random()*2+1
        this.change = () =>{this.changeState()}

    }
    updateState(){
        this.#_cooldown += 1;

        if(this.#_cooldown >= this.#_timer*60){
            // #_timer * 60 berarti sejumlah 1 * timer detik
            // fps udah gua lock 60fps dan cooldown bakalan nambah 1 per frame
            // console.log("hahah")
            this.#_cooldown = 0;
            this.changeState()
        }

    }
    changeState(){
        let rand = Math.round(Math.random())+1
        // console.log(rand)

        if(rand===1){
            this.Enemy.state = new EnemyWalk(this.Enemy)
        }else if(rand === 2){
            this.Enemy.state = new EnemyMagic(this.Enemy)
        }


        this.Enemy.state.startState()

    }


}