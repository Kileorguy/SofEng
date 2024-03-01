import {clearCanvas} from "../helper/canvasHelper.js";
import {Magic} from "../model/magic.js";
import {FactorySingleton} from "./singleton/allFactorySingleton.js";


// script isi logic game (start game, dst)

export class Game {
    static START = false
    static #gameInstance
    player
    static canvasWidth
    static canvasHeight
    ctx
    enemy
    static getInstance = () =>{
        if(this.#gameInstance == null){
            this.#gameInstance = new Game()
        }
        return this.#gameInstance
    }
    constructor() {
        this.fact = FactorySingleton.getInstance()
    }
    fps
    fpsInterval
    then
    startTime
    elapsed
    magics = []
    monkeys = []
    setFPS(){
        this.fps = 60
        this.fpsInterval = 1000 / this.fps;
        this.then = Date.now();
        this.startTime = this.then;
    }

    initMagic(x,y){
        this.magics.push(new Magic(x,y))
    }
    initMonkey(x,y){
        this.monkeys.push(this.fact.monkeyFact.createEntity(x,y))
    }

    moveLogic(){
        this.enemy.drawSelf(this.ctx)

        this.player.move()
        this.player.state.updateState()
        this.player.drawSelf(this.ctx)

        // console.log(this.magics.length)
        this.magics.forEach((m,index)=>{
            m.move()
            m.render(this.ctx)

            if(m.checkCollision()){
                this.magics.splice(index,1)
            }
        })
        this.monkeys.forEach((m,index)=>{
            m.move()
            m.drawSelf(this.ctx)
            if(m.deathTimer()) this.monkeys.splice(index,1)
        })
    }
    lastTimestamp = 0;
    render(timestamp){
        let deltaTime = (timestamp - this.lastTimestamp) / 16;
        this.lastTimestamp = timestamp;
        // console.log(deltaTime)
        this.now = Date.now()
        this.elapsed = this.now - this.then
        // console.log(this.elapsed)
        if(this.elapsed > this.fpsInterval){
            this.then = this.now - (this.elapsed % this.fpsInterval)
            clearCanvas(this.ctx)
            this.moveLogic()
            this.enemy.state.updateState()
        }
        requestAnimationFrame(this.render.bind(this))
    }


}