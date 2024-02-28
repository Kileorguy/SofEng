class Player {
    constructor(HP,x,y) {
        this.HP = HP
        this.x = x
        this.y = y
    }
}
var player
function initPlayer(hp, x, y) {
    player = new Player(hp,x,y)
    console.log(player)
}