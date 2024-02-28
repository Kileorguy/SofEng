import {clearCanvas} from "../helper/canvasHelper.js";


// script isi logic game (start game, dst)

export class Game {
    static START = false
    static gameInstance
    static ctx

    static getInstance = () =>{
        if(this.gameInstance == null){
            this.gameInstance = new Game()
        }
        return this.gameInstance
    }
    player
    enemy
    static canvasWidth
    static canvasHeight
    ctx

    constructor() {
    }
    fps
    fpsInterval
    then
    startTime
    elapsed
    setFPS(){
        this.fps = 60
        this.fpsInterval = 1000 / this.fps;
        this.then = Date.now();
        this.startTime = this.then;
    }

    moveLogic(){
        this.enemy.drawSelf(this.ctx)

        this.player.move()
        this.player.drawSelf(this.ctx)


    }

    render(){
        this.now = Date.now()
        this.elapsed = this.now - this.then
        if(this.elapsed > this.fpsInterval){
            this.then = this.now - (this.elapsed % this.fpsInterval)
            clearCanvas(this.ctx)
            this.moveLogic()
        }
        requestAnimationFrame(this.render.bind(this))
    }

}