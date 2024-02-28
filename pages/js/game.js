import {Enemy} from '../../model/enemy.js'
import {Player} from '../../model/player.js'
import {Game} from "../../scripts/gameLogic.js";
import {Magic} from "../../model/magic.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const cvsWidth = canvas.offsetWidth
const cvsHeight = canvas.offsetHeight

window.onload = () =>{
    startGame()
}

// function initEntities(){
//     player = new Player(100,cvsWidth/2,cvsHeight/2, 100,100,80,100)
//     enemy = new Enemy(300,cvsWidth/4,cvsHeight/2, 150,150)
// }

function startGame(){
    // kurang lebih ini buat init init variable gamenya
    const game = Game.getInstance()
    game.start = true

    Game.canvasWidth = cvsWidth
    Game.canvasHeight = cvsHeight

    game.ctx = ctx
    game.player = new Player(100,cvsWidth/2,cvsHeight/2,100,100,80,100)
    game.enemy = new Enemy(300,cvsWidth/5,cvsHeight/2, 150,150)

    game.setFPS()
    game.enemy.state.startState()
    game.render()

    game.magics.push(new Magic(500,200))
    game.magics.push(new Magic(400,300))
    game.magics.push(new Magic(200,400))
    game.magics.push(new Magic(100,500))
    game.magics.push(new Magic(300,100))
    game.magics.push(new Magic(150,200))


    let key
    let keydown = false
    const moveSpeed = 8

    document.addEventListener('keydown', function(event) {
        key = event.key;
        key = key.toLowerCase()
        switch (key) {
            case 'a':{
                game.player.facing = key
                game.player.vx = -moveSpeed
                keydown = true
                break
            }
            case 'd':{
                game.player.facing = key
                game.player.vx = moveSpeed
                keydown = true
                break
            }
            case 'w':{
                game.player.facing = key
                game.player.vy = -moveSpeed
                keydown = true
                break
            }
            case 's':{
                game.player.facing = key
                game.player.vy = moveSpeed

                keydown = true
                break
            }
        }
    });

    document.addEventListener('keyup', function(event) {
        key = event.key;
        key = key.toLowerCase()
        switch (key) {
            case 'a':{
                if(game.player.vx === -moveSpeed){
                    game.player.vx = 0
                }
                break
            }
            case 'd':{

                if(game.player.vx === moveSpeed){
                    game.player.vx = 0
                }
                break
            }
            case 'w':{
                if(game.player.vy === -moveSpeed){
                    game.player.vy = 0
                }
                break
            }
            case 's':{
                if(game.player.vy === moveSpeed){
                    game.player.vy = 0
                }
                break
            }
        }
    });
}



