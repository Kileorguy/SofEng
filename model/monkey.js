class Monkey extends entity{
    constructor(HP,x,y,width,height) {
        super(HP,x,y,width,height);

    }
    drawSelf(){
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.x,this.y,this.width,this.height)
    }
}