export function getEuclidean(x,y,player) {
    let distX = Math.pow(player.x - x,2)
    let distY = Math.pow(player.y - y,2)
    return Math.sqrt(distX+distY)
}