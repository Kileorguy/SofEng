import {EntityFactory} from "./entityFactory.js";
import {Monkey} from "../../../model/monkey.js";

export class MonkeyFactory extends EntityFactory{

    constructor() {
        super();
    }
    createEntity(x,y) {
        // super.createEntity();
        return new Monkey(100,x,y,50,50)
    }

}