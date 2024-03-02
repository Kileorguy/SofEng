import {Game} from "../scripts/gameLogic.js";

/**
 *
 * @param x : number
 * @param y : number
 * @param px : number
 * @param py : number
 * @returns {number}
 */
export function getEuclidean(x,y,px,py) {
    let distX = Math.pow(px - x,2)
    let distY = Math.pow(py - y,2)
    return Math.sqrt(distX+distY)
}

/**
 *
 * @param x : number
 * @param width : number
 * @returns {boolean}
 */
export function horizontalCollision(x,width){

    return x <= 0  || x >=  Game.canvasWidth - width;

}

/**
 *
 * @param y : number
 * @param height : number
 * @returns {boolean}
 */
export function verticalCollision(y, height){
    return y <= 0 || y >= Game.canvasHeight - height;
}