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

function init() {
    initPlayer(100,cvsWidth/2,cvsHeight/2, 100,100)
    clearCanvas()
    draw()
}

function draw(){
    clearCanvas()
    move()
    player.drawSelf()
    requestAnimationFrame(draw)
}
