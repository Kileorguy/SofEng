import {Game} from "../scripts/gameLogic.js";

export function clearCanvas(ctx,img) {
    ctx.drawImage(img, 0, 0, Game.canvasWidth,Game.canvasHeight);
}

