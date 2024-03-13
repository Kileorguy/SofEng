import {State} from "../state.js";
import {EnemyIdle} from "./enemyIdle.js";
import {cooldownValidation} from "../../../helper/frameRateHelper.js";
import {Game} from "../../gameLogic.js";
import {CircleLight} from "../../../model/circleLight.js";

export class EnemySummon extends State{
    #counter=0
    #freeze = 0.8
    constructor(enemy) {
        super();
        this.enemy = enemy
    }
    startState(){

    }

    updateState(){
        this.#counter++
        if(cooldownValidation(this.#counter,this.#freeze)){
            this.changeState()
        }
    }
    changeState(){
        let game = Game.getInstance()
        let w = this.enemy.width
        let h = this.enemy.height
        let eX = this.enemy.x + w/2
        let eY = this.enemy.y + h/2
        for(let i=0;i<2;i++){
            let randX = Math.random()*100 + w
            let randY = Math.random()*100 + h
            let multi = 1
            let multi1 = 1
            if(Math.round(Math.random())===0){
                multi = -1
            }
            if(Math.round(Math.random())===0){
                multi1 = -1
            }
            let x = eX + randX * multi;
            let y = eY+randY*multi1;
            if(x < 0 || y < 0 || x > Game.canvasWidth || y > Game.canvasHeight){
                i--
                continue
            }
            let mage = game.fact.mageFact.createEntity(x,y)
            if(mage) game.mages.push(mage)

        }

        this.enemy.state = new EnemyIdle(this.enemy)
        this.enemy.state.startState()
    }

}