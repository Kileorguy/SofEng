// export default function Game() {
//
// }

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const cvsWidth = canvas.offsetWidth
const cvsHeight = canvas.offsetHeight
document.addEventListener("keydown", ()=>{});
window.onload = () =>{
    init()
    console.log(cvsWidth, cvsHeight)
}

function clearCanvas(){
    ctx.fillStyle = "white"
    ctx.fillRect(0,0,cvsWidth,cvsHeight)
}

let frameCount =0
let fps, fpsInterval, startTime, now, then, elapsed;

function setFramePerSecond(){
    fps = 60
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
}

let enemy
let player

function initEntities(){
    player = new Player(100,cvsWidth/2,cvsHeight/2, 100,100,80,100)
    enemy = new Enemy(300,cvsWidth/4,cvsHeight/2, 150,150)
}

function init() {
    setFramePerSecond()
    initEntities()
    clearCanvas()
    startGame()
}

function startGame(){
    now = Date.now()
    elapsed = now - then

    if(elapsed > fpsInterval){
        then = now - (elapsed % fpsInterval)

        move()
        clearCanvas()
        enemy.drawSelf()
        player.drawSelf()

    }
    requestAnimationFrame(startGame)
}
