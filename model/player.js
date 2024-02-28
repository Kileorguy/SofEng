class Player {
    constructor(HP,x,y,width,height) {
        this.HP = HP
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }
    drawSelf(){
        ctx.fillStyle = 'red'
        ctx.fillRect(this.x,this.y,this.width,this.height)
    }
}
var player
function initPlayer(hp, x, y, width, height) {
    player = new Player(hp,x,y,width,height)

}