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
            return new Mage(30,x,y,80,80)
        }
        return null
    }
}