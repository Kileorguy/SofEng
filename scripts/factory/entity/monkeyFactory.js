import {EntityFactory} from "./entityFactory.js";
import {Monkey} from "../../../model/monkey.js";

export class MonkeyFactory extends EntityFactory{

    constructor() {
        super();
    }
    createEntity() {
        // super.createEntity();
        return new Monkey()
    }

}