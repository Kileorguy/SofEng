/**
 *
 * @param sec : number
 */
const frameRate = 60
export function secondToFrame(sec) {
    return sec * frameRate
}

export function frameToSecond(frame){
    return frame/frameRate
}

/**
 *
 * @param counter : number dalam bentuk frames
 * @param cooldown : number dalam bentuk second
 * @returns {boolean}
 */
export function cooldownValidation(counter,cooldown){
    return counter >= (cooldown * frameRate)
}