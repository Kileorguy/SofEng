import {EnemyFactory} from "../factory/entity/enemyFactory.js";
import {PlayerFactory} from "../factory/entity/playerFactory.js";
import {MonkeyFactory} from "../factory/entity/monkeyFactory.js";

export class FactorySingleton {

    static #_instance
    enemyFact
    playerFact
    monkeyFact
    constructor() {
    }

    static #_createInstance(){
        let f = new FactorySingleton()
        f.enemyFact = new EnemyFactory()
        f.playerFact = new PlayerFactory()
        f.monkeyFact = new MonkeyFactory()
        return f
    }
    static getInstance(){
        if(!this.#_instance){
            FactorySingleton.#_instance = this.#_createInstance()
        }
        return FactorySingleton.#_instance
    }



}