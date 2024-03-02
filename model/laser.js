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
        this.offset = 30
        this.laserGrids = []
        let game = Game.getInstance()
        let p = game.player
        this.img = new Image(this.offset,this.offset)
        this.img.src = '../public/images/images.jpg'

        this.rad = Math.atan2(p.y+p.height/2-y,p.x+p.width/2-x)
    }

    generateLaser(player, rad){
        let offset = this.offset
        let py = player.y + player.height / 2;
        let px = player.x+player.width/2;
        let newRad = Math.atan2(
            py-this.y,
            px-this.x)
        let diff = newRad - rad
        // console.log(diff)
        if(diff < -0.02 || diff > 0.02){
            if(rad > newRad) this.rad -= 0.003
            else this.rad += 0.003

        }
        this.laserGrids = []
        let x = this.x
        let y = this.y
        // let rad = Math.atan2(player.y-y, player.x-x)
        for(let i=0;i<100;i++){
            x += Math.cos(rad)*offset
            y += Math.sin(rad)*offset
            // console.log(x,y)
            let laserGrid = new LaserGrid(x,y)
            this.laserGrids.push(laserGrid)
            if(x + offset >= player.x && x-offset <= player.x + player.width
            && y+offset >= player.y && y-offset <= player.y + player.height) break
        }
    }

    drawSelf(ctx,player){

        this.generateLaser(player,this.rad)
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