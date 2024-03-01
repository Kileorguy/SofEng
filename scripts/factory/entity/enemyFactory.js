import {EntityFactory} from "./entityFactory.js";
import {Enemy} from "../../../model/enemy.js";

export class EnemyFactory extends EntityFactory{

    constructor() {
        super()
    }

    // game.player = new Player(100,cvsWidth/2,cvsHeight/2,100,100,80,100)
    createEntity(x,y){
        // super.createEntity();
        // return new Enemy(300, cvsWidth / 5, cvsHeight / 2, 150, 150)
        return new Enemy(300, x,y, 150, 150)
    }


}