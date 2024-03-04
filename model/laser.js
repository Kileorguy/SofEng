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
        // newRad = Math.abs(newRad)
        // rad = Math.abs(rad)

        // console.log(Math.round(newRad*100)/2, Math.round(rad*100)/2 )
        let diff = newRad - rad

        let lX = px
        if(lX < this.x){
            lX = this.x-px+this.x
        }
        let lY = Math.tan(rad)*(lX- this.x) + this.y
        // console.log(lX,lY)
        // ctx.fillRect(lX,lY,100,100)
        // console.log(rad*180/Math.PI, newRad*180/Math.PI)


        let deg =((rad * 180 / Math.PI) + 180) % 360
        let deg1 =( (newRad * 180 / Math.PI) + 180) % 360

        let dg = 360 - deg
        let dg1 = 360 - deg1
        // console.log(deg1.toFixed(2),dg1.toFixed(2))

        let res1 = Math.abs(deg - deg1)
        let res2 = Math.abs(deg - dg1)
        console.log(res1.toFixed(2),res2.toFixed(2))

        if(diff < -0.02 || diff > 0.02){
            if(res1<res2){
                this.rad += 0.005
            }else{
                this.rad -= 0.005
            }

            // if(dg1 < deg1){
            //     // this.rad += 0.005
            //     // console.log("a")
            //     if(dg1 - dg < 0){
            //             this.rad+=0.005
            //     }else{
            //         this.rad-=0.005
            //     }
            // }else{
            //     // this.rad -= 0.005
            //     // console.log("b")
            //     if(deg1 - deg < 0){
            //         this.rad-=0.005
            //     }else{
            //         this.rad+=0.005
            //     }
            // }

            // if(equation1 < equation2){
            //     // console.log("a")
            //     res = equation1
            //     this.rad+=0.005
            // }else{
            //     // console.log("b")
            //     res = equation2
            //     this.rad -= 0.005
            // }
            // console.log(equation1.toFixed(1),equation2.toFixed(1))

            // console.log(py,lY)
            // if(py < lY){
            //     this.rad-=0.005
            // }else this.rad +=0.005

            // if(lX>=0 && lX <= Game.canvasWidth){
            //     console.log("x")
            //     if(px - lX < 0 ) this.rad -= 0.005
            //     else this.rad += 0.005
            // }else{
            //     console.log("y")
            //     if(py - lY < 0 ) this.rad -= 0.005
            //     else this.rad += 0.005
            // }

            // if(px-lX < 0 || py-lY < 0) this.rad -= 0.005
            // else this.rad += 0.005

            // if(rad > newRad) this.rad -= 0.005
            // else this.rad += 0.005


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