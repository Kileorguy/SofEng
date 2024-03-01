import {clearCanvas} from "../helper/canvasHelper.js";
import {Magic} from "../model/magic.js";


// script isi logic game (start game, dst)

export class Game {
    static START = false
    static #gameInstance
    player
    enemy
    static canvasWidth
    static canvasHeight
    ctx
    static getInstance = () =>{
        if(this.#gameInstance == null){
            this.#gameInstance = new Game()
        }
        return this.#gameInstance
    }
    constructor() {
    }
    fps
    fpsInterval
    then
    startTime
    elapsed
    magics = []
    setFPS(){
        this.fps = 60
        this.fpsInterval = 1000 / this.fps;
        this.then = Date.now();
        this.startTime = this.then;
    }

    initMagic(x,y){
        this.magics.push(new Magic(x,y))
    }

    moveLogic(){
        this.enemy.drawSelf(this.ctx)

        this.player.move()
        this.player.drawSelf(this.ctx)

        // console.log(this.magics.length)
        this.magics.forEach((m,index)=>{
            m.move()
            m.render(this.ctx)

            if(m.checkCollision()){
                this.magics.splice(index,1)
            }
        })
    }

    render(){
        this.now = Date.now()
        this.elapsed = this.now - this.then
        if(this.elapsed > this.fpsInterval){
            this.then = this.now - (this.elapsed % this.fpsInterval)
            clearCanvas(this.ctx)
            this.moveLogic()
            this.enemy.state.updateState()
        }
        requestAnimationFrame(this.render.bind(this))
    }

}