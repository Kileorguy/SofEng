export class SpriteFacade {

    image = {
        player : {
            'attack' : [],
            'idle' : []
        }
    }


    loadImages(){
        const appendSpriteData = (entity,name,path) => {
            let image = new Image()
            image.src = path
            console.log(image)
            this.image[entity][name].push(image)
        }
        let path = ''
        for (let i = 1; i <= 11; i++) {
            path = '../../assets/player/attack/attack_' + i +'.png'
            appendSpriteData('player','attack',path)
        }
        console.log(this.image['player']['attack'].length)

    }

    constructor() {
        this.loadImages()
        console.log("a")
    }


}