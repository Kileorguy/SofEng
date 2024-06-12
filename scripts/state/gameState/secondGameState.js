import {State} from "../state.js";
import {Game} from "../../gameLogic.js";
import {ThirdGameState} from "./thirdGameState.js";
import {FactorySingleton} from "../../singleton/allFactorySingleton.js";
import {cooldownValidation} from "../../../helper/frameRateHelper.js";


export class SecondGameState extends State{

    done = false

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
            if(m.HP<=0) {
                game.mages.splice(index, 1)
                Game.mageCounter -= 1
            }
        })

        game.circleLights.forEach((c,idx)=>{
            c.move(game.player)
            c.drawSelf(game.ctx)
            if(c.checkCollision(game.player))game.circleLights.splice(idx,1)
        })
    }

    startState(){
        let f = FactorySingleton.getInstance()

        this.game.enemy = f.enemyFact.createEntity(Game.canvasWidth/5, Game.canvasHeight/2)
        this.game.enemy.state.startState()

        const backgroundMusic = new Audio('../../assets/BGM/BGM.mp3');
        backgroundMusic.loop = true;
        backgroundMusic.volume = 0.05
        backgroundMusic.play();

        const video = document.createElement('video');
        video.src = '../../assets/transitions/levels/onetwo/transition_L1L2.mp4';
        video.controls = false;
        video.autoplay = true;
        video.style.position = 'fixed';
        video.style.top = '0';
        video.style.left = '0';
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.zIndex = '1000';
        video.style.objectFit = 'cover';

        video.addEventListener('ended', () => {
            this.game.mageCounter = 0
            this.game.magics = []
            this.game.monkeys = []
            this.game.mages = []
            this.game.circleLights = []




            let game = this.game
            this.moveLogic(game)
            game.player.drawSelf(game.ctx)

            video.style.display = 'none';
            this.done = true
            this.game.player = f.playerFact.createEntity(Game.canvasWidth/2, Game.canvasHeight/4)
            this.game.player.state.startState()
        });

        document.body.appendChild(video);


        // this.moveLogic(game)
    }

    updateState(){

        if(!this.done){
            return
        }

        let game = this.game
        this.moveLogic(game)
        if(game.enemy)game.enemy.state.updateState()
        if(game.laser) game.laser.drawSelf(game.ctx,game.player)
    }
    changeState(){

        this.game.state = new ThirdGameState(this.game)
        this.game.state.startState()
    }

}