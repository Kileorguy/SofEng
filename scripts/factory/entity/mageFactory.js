import {EntityFactory} from "./entityFactory.js";
import {Mage} from "../../../model/mage.js";
import {Game} from "../../gameLogic.js";

export class MageFactory extends EntityFactory {
    constructor() {
        super();
    }

    createEntity(x,y) {
        if(Game.mageCounter <4){
            Game.mageCounter++
            return new Mage(100,x,y,50,50)
        }
        return null
    }
}