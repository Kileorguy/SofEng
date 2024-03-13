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
 * @param counter : number frames
 * @param cooldown : number detik
 * @returns {boolean}
 */
export function cooldownValidation(counter,cooldown){
    // console.log(counter,cooldown)
    return counter >= (cooldown * frameRate)
}