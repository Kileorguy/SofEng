export class Entity {
    /**
     * @param HP : number
     * @param x : number
     * @param y : number
     * @param width : number
     * @param height : number
     */
    constructor(HP,x,y,width,height) {
        this.HP = HP
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    move(){
        throw new Error("Cannot instantiate abstract class");
    }
    drawSelf(){
        throw new Error("Cannot instantiate abstract class");
    }
}