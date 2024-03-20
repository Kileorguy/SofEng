import {Game} from "../scripts/gameLogic.js";
import {LaserGrid} from "./laserGrid.js";

export class Laser {

    /**
     *
     * @param x : number
     * @param y : number
     */
    constructor(x,y) {
        this.x = x
        this.y = y
        this.offset = 40
        this.laserGrids = []
        let game = Game.getInstance()
        let p = game.player
        this.p = p
        this.img = new Image(this.offset,this.offset)
        this.img.src = '../public/images/images.jpg'
        this.rad = Math.atan2(p.y+p.height/2-y,p.x+p.width/2-x)
    }

    generateLaser(player, rad, ctx){
        let offset = this.offset
        let py = player.y + player.height / 2;
        let px = player.x+player.width/2;
        let newRad = Math.atan2(
            py-this.y,
            px-this.x)

        let diff = newRad - rad

        let angularDistance = ((newRad - this.rad + Math.PI) % (2 * Math.PI)) - Math.PI;
        if(angularDistance < -3){
            angularDistance = Math.abs(angularDistance)
        }
        // console.log(angularDistance)
        if(diff < -0.02 || diff > 0.02){
            if (angularDistance > 0) {
                this.rad += 0.005
            } else {
                this.rad -= 0.005
            }
        }
        this.laserGrids = []
        let x = this.x
        let y = this.y
        for(let i=0;i<100;i++){
            x += Math.cos(rad)*offset
            y += Math.sin(rad)*offset
            let laserGrid = new LaserGrid(x,y)
            this.laserGrids.push(laserGrid)
            if(x + offset >= player.x && x-offset <= player.x + player.width
            && y+offset >= player.y && y-offset <= player.y + player.height){
                this.p.takeDamage(2,true)
                break
            }
            let game = Game.getInstance()
            let monkeys = game.monkeys
            var col = false
            for(let i = 0; i<monkeys.length;i++){
                let m = monkeys[i]

                if(x+offset >= m.x && x-offset <= m.x + m.width
                    && y + offset >= m.y && y - offset <= m.y + m.height){
                    col = true
                    m.HP -= 3
                    break
                }
            }
            if(col) break
        }
    }

    drawSelf(ctx,player){

        this.generateLaser(player,this.rad, ctx)
        let laserGrids = this.laserGrids
        // console.log(laserGrids.length)


        laserGrids.forEach((l)=>{
            ctx.save();
            ctx.translate(l.x, l.y);
            ctx.rotate(this.rad);
            // ctx.fillStyle  = 'white'
            // ctx.fillRect(-this.offset/2,-this.offset/2,this.offset+2,this.offset+2)
            ctx.drawImage(this.img, -this.offset / 2, -this.offset / 2, this.offset + 2, this.offset + 2);
            ctx.restore();
        })
        // ctx.restore()

    }
}