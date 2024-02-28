class Enemy extends entity{
    constructor(HP,x,y,width,height) {
        super(HP,x,y,width,height);
    }

    drawSelf(){
        ctx.fillStyle = 'red'
        ctx.fillRect(this.x,this.y,this.width,this.height)
    }
}