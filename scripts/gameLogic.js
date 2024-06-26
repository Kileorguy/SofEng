import {clearCanvas} from "../helper/canvasHelper.js";
import {Magic} from "../model/magic.js";
import {FactorySingleton} from "./singleton/allFactorySingleton.js";
import {Laser} from "../model/laser.js";
import {FirstGameState} from "./state/gameState/firstGameState.js";
import {SpriteFacade} from "./facade/spriteFacade.js";
import {LoseState} from "./state/gameState/loseState.js";
import {SoundFacade} from "./facade/soundFacade.js";
import {ThirdGameState} from "./state/gameState/thirdGameState.js";
import {SecondGameState} from "./state/gameState/secondGameState.js";
import {WinState} from "./state/gameState/winState.js";


// script isi logic game (start game, dst)

export class Game {
    static START = false
    static #gameInstance
    static canvasWidth
    static canvasHeight
    static mageCounter = 0
    static level = 1
    ctx
    facade = new SpriteFacade()
    sfacade = new SoundFacade()



    static getInstance = () =>{
        if(this.#gameInstance == null){
            this.#gameInstance = new Game()
        }
        return this.#gameInstance

    }
    constructor() {
        this.fact = FactorySingleton.getInstance()

        this.state = new FirstGameState(this)
        // this.state = new WinState(th is)
        // this.state = new LoseState(this)

    }
    fps
    fpsInterval
    then
    startTime
    endTime
    elapsed

    magics = []
    monkeys = []
    mages = []
    circleLights = []
    player
    enemy
    laser = null

    setFPS(){
        this.fps = 60
        this.fpsInterval = 1000 / this.fps;
        this.then = Date.now();
        this.startTime = this.then;
    }

    drawHealth(ctx){
        if(this.player){
            ctx.font = '30px Arial'
            ctx.fillStyle = 'white'
            ctx.fillText(this.player.HP,10,50,100,100)
            ctx.fillStyle = 'red'
            ctx.fillText(this.enemy.HP,10,100,100,100)
        }
    }

    initMagic(x,y){
        this.magics.push(new Magic(x,y))
    }
    initMonkey(x,y){
        this.monkeys.push(this.fact.monkeyFact.createEntity(x,y))
    }

    initLaser(x,y){
        if(this.laser === null){
            this.laser = new Laser(x,y)

        }
    }

    moveLogic(){
        if(this.enemy)this.enemy.drawSelf(this.ctx)

        this.player.move()
        this.player.state.updateState()
        this.player.drawSelf(this.ctx)

        // console.log(this.magics.length)
        // console.log(this.player.HP)
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

        this.mages.forEach((m,index)=>{
            m.move()
            m.drawSelf(this.ctx)
            if(m.HP<=0) {
                this.mages.splice(index,1)
                Game.mageCounter-=1
            }
        })

        this.circleLights.forEach((c,idx)=>{
            c.move(this.player)
            c.drawSelf(this.ctx)
            if(c.checkCollision(this.player))this.circleLights.splice(idx,1)
        })
    }

    animation
    lastTimestamp = 0;
    render(timestamp){
        this.lastTimestamp = timestamp;
        this.now = Date.now()
        this.elapsed = this.now - this.then
        if(this.elapsed > this.fpsInterval){
            this.then = this.now - (this.elapsed % this.fpsInterval)
            if(this.state instanceof FirstGameState){
                clearCanvas(this.ctx,this.facade.image['bg'])
            }else if(this.state instanceof SecondGameState){
                clearCanvas(this.ctx,this.facade.image['bg1'])
            }else{
                clearCanvas(this.ctx,this.facade.image['bg2'])
            }
            this.drawHealth(this.ctx)

            // this.moveLogic()
            // if(this.enemy)this.enemy.state.updateState()
            // if(this.laser) this.laser.drawSelf(this.ctx,this.player)
            this.state.updateState()

        }
        this.animation = requestAnimationFrame(this.render.bind(this))
        if(this.enemy.HP <=0){
            if (this.state instanceof WinState){
                return;
            }
                this.state.changeState()
        }
        if (this.player.HP <= 0){
            if(this.state instanceof LoseState){
               return
            }
            this.state = new LoseState(this);
            this.state.startState();
        }


    }


}