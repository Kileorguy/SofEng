import {Game} from "../scripts/gameLogic.js";

export function clearCanvas(ctx) {
    // let game = Game.getInstance()
    ctx.fillStyle = "black"
    ctx.fillRect(0,0,Game.canvasWidth,Game.canvasHeight)
}