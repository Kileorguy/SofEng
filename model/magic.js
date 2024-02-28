import {Game} from "../scripts/gameLogic.js";

export class Magic {
    v = 15
    _radius = 20
    _deltaTime
    _previousTime
    _currentTime
    _timer = 1
    _radian = 0

    constructor(x,y) {
        let game = Game.getInstance()
        this.x = x
        this.y = y
        this.player = game.player
        this.px = this.player.x + this.player.width/2
        this.py = this.player.y + this.player.height/2
        this._previousTime = performance.now()
        this._currentTime = performance.now()
    }

    move(){
        this.px = this.player.x + this.player.width/2
        this.py = this.player.y + this.player.height/2
        this._currentTime = performance.now();
        this._deltaTime = (this._currentTime - this._previousTime) / 1000;
        // let radians = Math.atan2(this.py - this.y, this.px - this.x);
        // let angle = radians * (180 / Math.PI)
        // console.log("testttt",angle)
        if(this._deltaTime<this._timer){
            this._radian = Math.atan2(this.py - this.y, this.px - this.x);
            // console.log("test")
        }
        this.x += this.v*this._deltaTime*Math.cos(this._radian)
        this.y += this.v*this._deltaTime*Math.sin(this._radian)

    }

    checkCollision(){
        // console.log(Math.round(getEuclidean(this.x, this.y, this.player)))
        let x = this.x
        let y = this.y
        let p = this.player
        if(x+this._radius >= p.x && x <= p.x+this._radius + p.width
            && y+this._radius >= p.y && y-this._radius <= p.y + p.height){
            p.HP -= 10

            return true
        }
        if(x <= 0 || y <= 0 || x >= Game.canvasWidth || y >= Game.canvasHeight) return true
        // logic damage player
        // console.log(p.HP)

        return false
    }

    render(ctx){
        ctx.fillStyle = 'purple'
        ctx.beginPath();
        ctx.arc(this.x, this.y, this._radius, 0, 2 * Math.PI);
        ctx.fill()
    }



}