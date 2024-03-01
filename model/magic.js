import {Game} from "../scripts/gameLogic.js";

export class Magic {
    v = 15
    _radius = 20
    #deltaTime
    #previousTime
    #currentTime
    #timer = 0.8
    #radian = 0

    /**
     *
     * @param x : number
     * @param y : number
     */
    constructor(x,y) {
        let game = Game.getInstance()
        this.x = x
        this.y = y
        this.player = game.player
        this.px = this.player.x + this.player.width/2
        this.py = this.player.y + this.player.height/2
        this.#previousTime = performance.now()
        this.#currentTime = performance.now()
    }

    move(){
        this.#currentTime = performance.now();
        this.#deltaTime = (this.#currentTime - this.#previousTime) / 1000;
        if(this.#deltaTime < 0.5 ) return

        this.px = this.player.x + this.player.width/2
        this.py = this.player.y + this.player.height/2

        if(this.#deltaTime<this.#timer+0.5){
            this.#radian = Math.atan2(this.py - this.y, this.px - this.x);
        }

        this.x += this.v*Math.cos(this.#radian)
        this.y += this.v*Math.sin(this.#radian)

    }

    checkCollision(){
        // console.log(Math.round(getEuclidean(this.x, this.y, this.player)))
        let x = this.x
        let y = this.y
        let p = this.player
        if(x+this._radius >= p.x && x <= p.x+this._radius + p.width
            && y+this._radius >= p.y && y-this._radius <= p.y + p.height){
            p.takeDamage(5)

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