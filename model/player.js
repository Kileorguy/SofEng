class Player extends entity{
    constructor(HP,x,y,width,height,atkW,atkH) {
        super(HP,x,y,width,height);
        this.atkW = atkW
        this.atkH = atkH
        this.facing = 's'
    }
    drawSelf(){
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.x,this.y,this.width,this.height)

        if(this.facing ==='a'){
            ctx.fillStyle = 'gray'
            let atkX = this.x-this.atkW;
            let atkY = this.y;
            ctx.fillRect(atkX, atkY, this.atkW,this.atkH)
        }else if(this.facing ==='d'){
            ctx.fillStyle = 'gray'
            let atkX = this.x+this.width;
            let atkY = this.y;
            ctx.fillRect(atkX, atkY, this.atkW,this.atkH)
        }else if(this.facing ==='w'){
            ctx.fillStyle = 'gray'
            let atkX = this.x
            let atkY = this.y-this.atkW
            ctx.fillRect(atkX, atkY,this.atkH,this.atkW)
        }else if(this.facing ==='s'){
            ctx.fillStyle = 'gray'
            let atkX = this.x
            let atkY = this.y+this.height
            ctx.fillRect(atkX, atkY,this.atkH,this.atkW)
        }
    }
}
