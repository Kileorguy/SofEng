import {FirstGameState} from "../scripts/state/gameState/firstGameState.js";

export class GameModel{
    static START = false
    static #gameInstance
    static canvasWidth
    static canvasHeight
    static mageCounter = 0
    ctx
    fps
    fpsInterval
    then
    startTime
    elapsed

    // entities
    magics = []
    monkeys = []
    mages = []
    circleLights = []
    player
    enemy

    laser = null
    constructor() {
        this.state = new FirstGameState()
    }

}