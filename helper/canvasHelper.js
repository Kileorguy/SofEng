import {Game} from "../scripts/gameLogic.js";

export function clearCanvas(ctx,img) {
    // let game = Game.getInstance()
    // ctx.fillStyle = "green"
    // ctx.fillRect(0,0,Game.canvasWidth,Game.canvasHeight)



    // ctx = canvas.getContext("2d");

    // Background Function
    // const image = new Image();
    // image.onload = drawImageActualSize;

    // image.src = "/assets/backgrounds/test.jpg";
    ctx.drawImage(img, 0, 0, Game.canvasWidth,Game.canvasHeight);
    // function drawImageActualSize()
    // {
    //     canvas.width = Game.canvasWidth;
    //     canvas.height = Game.canvasHeight;
    //
    //     ctx.drawImage(this, 0, 0);
    //     console.log(Game.canvasHeight);
    //     console.log(Game.canvasWidth);
    // }
}

