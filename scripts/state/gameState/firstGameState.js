import {State} from "../state.js";
import {Game} from "../../gameLogic.js";
import {SecondGameState} from "./secondGameState.js";
import {FactorySingleton} from "../../singleton/allFactorySingleton.js";
import {cooldownValidation} from "../../../helper/frameRateHelper.js";


export class FirstGameState extends State{

    #counter = 0
    #transition_cooldown = 2

    /**
     *
     * @param game : Game class
     */
    constructor(game) {
        super();
        this.game = game
        this.fact = game.fact
    }

    moveLogic(game){
        // console.log(Game.mageCounter)
        // let game = this.game
        if(game.enemy)game.enemy.drawSelf(game.ctx)

        game.player.move()
        game.player.state.updateState()
        game.player.drawSelf(game.ctx)

        // console.log(game.magics.length)
        // console.log(game.player.HP)
        game.magics.forEach((m,index)=>{
            m.move()
            m.render(game.ctx)

            if(m.checkCollision()){
                game.magics.splice(index,1)
            }
        })
        game.monkeys.forEach((m,index)=>{
            m.move()
            m.drawSelf(game.ctx)
            if(m.deathTimer()) game.monkeys.splice(index,1)
        })

        game.mages.forEach((m,index)=>{
            m.move()
            m.drawSelf(game.ctx)
            if(m.HP<=0) game.mages.splice(index,1)
        })

        game.circleLights.forEach((c,idx)=>{
            c.move(game.player)
            c.drawSelf(game.ctx)
            if(c.checkCollision(game.player))game.circleLights.splice(idx,1)
        })
    }

    startState(){
        this.game.mageCounter = 0
        this.game.magics = []
        this.game.monkeys = []
        this.game.mages = []
        this.game.circleLights = []
        let f = FactorySingleton.getInstance()
        this.game.enemy = f.enemyFact.createEntity(Game.canvasWidth/5, Game.canvasHeight/2)
        console.log('done create enemy')
        this.game.enemy.state.startState()

        let game = this.game
        this.moveLogic(game)
        game.player.drawSelf(game.ctx)
        // this.moveLogic(game)

        // if(game.enemy)game.enemy.state.updateState()
        // if(game.laser) game.laser.drawSelf(game.ctx,game.player)
    }

    updateState(){
        if(!cooldownValidation(this.#counter,this.#transition_cooldown)){
            this.#counter++
            // this.moveLogic(this.game)
            // console.log(this.#counter)
            this.game.player.drawSelf(this.game.ctx)
            if(this.game.enemy)this.game.enemy.drawSelf(this.game.ctx)


            return
        }


        let game = this.game
        this.moveLogic(game)
        if(game.enemy)game.enemy.state.updateState()
        if(game.laser) game.laser.drawSelf(game.ctx,game.player)
    }
    changeState(){
        this.game.state = new SecondGameState(this.game)
        this.game.state.startState();

    }

}