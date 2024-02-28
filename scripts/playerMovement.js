
function testDrawPlayer(){
    ctx.fillStyle = "red"
    ctx.fillRect(player.x,player.y,player.width,player.height)
}

let key
let vx =0
let vy = 0
let keydown = false
const moveSpeed = 8
document.addEventListener('keydown', function(event) {
    key = event.key;
    key = key.toLowerCase()
    switch (key) {
        case 'a':{
            vx = -moveSpeed
            keydown = true
            break
        }
        case 'd':{
            vx = moveSpeed
            keydown = true
            break
        }
        case 'w':{
            vy = -moveSpeed
            keydown = true
            break
        }
        case 's':{
            vy =moveSpeed
            keydown = true
            break
        }
    }
});

document.addEventListener('keyup', function(event) {
    key = event.key;
    key = key.toLowerCase()
    switch (key) {
        case 'a':{
            if(vx === -moveSpeed){
                vx = 0
            }
            break
        }
        case 'd':{

            if(vx === moveSpeed){
                vx = 0
            }
            break
        }
        case 'w':{
            if(vy === -moveSpeed){
                vy = 0
            }
            break
        }
        case 's':{
            if(vy === moveSpeed){
                vy = 0
            }
            break
        }
    }
});

function horizontalCollision(x){
    let width = player.width
    return x <= 0  || x >= cvsWidth - width;

}
function verticalCollision(y){
    let height = player.height
    return y <= 0 || y >= cvsHeight - height;

}
function move(){

    if(!horizontalCollision(player.x+vx)){
        player.x += vx
    }
    if(!verticalCollision(player.y+vy)){
        player.y  += vy
    }

}