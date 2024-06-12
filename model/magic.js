import {Game} from "../scripts/gameLogic.js";
import {getEuclidean} from "../helper/distanceHelper.js";

export class Magic {
    v = 15
    _radius = 60
    #deltaTime
    #previousTime
    #currentTime
    #timer = 0.7
    #radian = 0
    follow = true
    #spriteLength = 1
    spriteFrame = 0
    #framesCounter = 0
    #framesHold = 8

    /**
     *
     * @param x : number
     * @param y : number
     */
    constructor(x,y) {
        this.game = Game.getInstance()
        this.sprites = this.game.facade.image['magic']
        this.x = x
        this.y = y
        this.player = this.game.player
        this.px = this.player.x + this.player.width/2
        this.py = this.player.y + this.player.height/2
        this.#previousTime = performance.now()
        this.#currentTime = performance.now()
        this.#radian = Math.atan2(this.py - this.y, this.px - this.x);

    }

    move(){
        this.#currentTime = performance.now();
        this.#deltaTime = (this.#currentTime - this.#previousTime) / 1000;
        if(this.#deltaTime < 0.5 ) return

        this.px = this.player.x + this.player.width/2
        this.py = this.player.y + this.player.height/2
        console.log(getEuclidean(this.x,this.y,this.px,this.py))
        if(this.#deltaTime>=this.#timer+0.5 || getEuclidean(this.x,this.y,this.px,this.py) <= 300 ) {
            this.follow = false
        }
        if(this.follow){

            this.#radian = Math.atan2(this.py - this.y, this.px - this.x);
        }else{
            this.follow = false
        }


        this.x += this.v*Math.cos(this.#radian)
        this.y += this.v*Math.sin(this.#radian)

    }

    checkMonkey = (x,r,m)=>{

    }
    checkCollision(){
        // console.log(Math.round(getEuclidean(this.x, this.y, this.player)))
        let x = this.x
        let y = this.y
        let p = this.player
        let r = this._radius;
        if(x+ r >= p.x && x <= p.x+r + p.width
            && y+r >= p.y && y-r <= p.y + p.height){
            p.takeDamage(5)

            return true
        }
        let game = Game.getInstance()
        let monkeys = game.monkeys
        for(let i = 0; i<monkeys.length;i++){
            let m = monkeys[i]
            if(x+r >= m.x && x-r <= m.x + m.width
            && y + r >= m.y && y - r <= m.y + m.height){
                m.HP -= 20
                return true
            }
        }
        if(x <= 0-100 || y <= 0-100 || x >= Game.canvasWidth+100 || y >= Game.canvasHeight+100) return true
        // logic damage player
        // console.log(p.HP)

        return false
    }

    render(ctx){

        this.#spriteLength = this.sprites['magic']['magic'].length
        this.spriteFrame %= this.sprites['magic']['magic'].length

        // ctx.fillRect(this.x,this.y,this._radius,this._radius)
        ctx.save();

        ctx.translate(this.x,this.y);
        ctx.rotate(this.#radian + Math.PI / 2);
        ctx.drawImage(this.sprites['magic']['magic'][this.spriteFrame],-this._radius/2,-this._radius/2,this._radius,this._radius)
        ctx.restore();

        this.#framesCounter += 1

        if(this.#framesCounter % this.#framesHold === 0){

            this.spriteFrame = (this.spriteFrame + 1) % this.#spriteLength
        }
    }
}