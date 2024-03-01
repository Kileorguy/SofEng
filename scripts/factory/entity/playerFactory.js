import {EntityFactory} from "./entityFactory.js";
import {Player} from "../../../model/player.js";

export class PlayerFactory extends EntityFactory{

    constructor() {
        super();
    }

    createEntity(x,y){
        // super.createEntity();
        return new Player(100,x,y,100,100,80,100)
    }

}