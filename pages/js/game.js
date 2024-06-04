import {Game} from "../../scripts/gameLogic.js";
import {FactorySingleton} from "../../scripts/singleton/allFactorySingleton.js";
import {Laser} from "../../model/laser.js";
import {SpriteFacade} from "../../scripts/facade/spriteFacade.js";
import {SoundFacade} from "../../scripts/facade/soundFacade.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const cvsWidth = canvas.offsetWidth
const cvsHeight = canvas.offsetHeight


window.onload = () =>{

    startGame()
    // console.log('test')
}

// function initEntities(){
//     player = new Player(100,cvsWidth/2,cvsHeight/2, 100,100,80,100)
//     enemy = new Enemy(300,cvsWidth/4,cvsHeight/2, 150,150)
// }

function startGame(){


    // kurang lebih ini buat init init variable gamenya
    let f = FactorySingleton.getInstance()
    const game = Game.getInstance()
    // ctx.rotate(45*Math.PI/180)
    game.start = true

    Game.canvasWidth = cvsWidth
    Game.canvasHeight = cvsHeight

    game.ctx = ctx
    game.player = f.playerFact.createEntity(cvsWidth/2,cvsHeight/4)
    game.player.state.startState()

    game.setFPS()

    game.state.startState()

    // let f = FactorySingleton.getInstance()
    // this.game.enemy = f.enemyFact.createEntity(Game.canvasWidth/5, Game.canvasHeight/2)
    // this.game.enemy.state.startState()

    // game.laser = new Laser(100,100)
    game.render()


    // game.mages.push(f.mageFact.createEntity(1001,100))
    // game.magics.push(new Magic(150,200))
}



