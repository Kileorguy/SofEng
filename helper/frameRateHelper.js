/**
 *
 * @param sec : number
 */
const frameRate = 60
export function secondToFrame(sec) {
    return sec * frameRate
}

/**
 *
 * @param counter : number
 * @param cooldown : number
 * @returns {boolean}
 */
export function cooldownValidation(counter,cooldown){
    return counter >= (cooldown * frameRate)
}