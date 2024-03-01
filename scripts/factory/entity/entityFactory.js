export class EntityFactory {

    constructor() {

    }
    createEntity(){
        throw new Error("Cannot instantiate abstract class");
    }

}