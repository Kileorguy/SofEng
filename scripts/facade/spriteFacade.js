export class SpriteFacade {

    image = {
        player : {
            'attack' : [],
            'idle' : [],
            'move' : {
                'up' : [],
                'down' : [],
                'left' : [],
                'right' : [],
            }
        }
    }


    loadImages(){
        const appendSpriteData = (entity,name,path) => {
            let image = new Image()
            image.src = path
            console.log(image)
            this.image[entity][name].push(image)
        }
        const appendSpriteSubData = (entity,subEntity,name,path) => {
            let image = new Image()
            image.src = path
            console.log(image)
            this.image[entity][subEntity][name].push(image)
        }
        let path = ''
        for (let i = 1; i <= 11; i++) {
            path = '../../assets/player/attack/attack_' + i +'.png'
            appendSpriteData('player','attack',path)
        }
        for (let i = 1; i <= 12; i++) {
            path = '../../assets/player/move/down/move_down_' + i + '.png'
            appendSpriteSubData('player','move','down',path)

            path = '../../assets/player/move/up/move_up_' + i + '.png'
            appendSpriteSubData('player','move','up',path)

            path = '../../assets/player/move/left/move_left_' + i + '.png'
            appendSpriteSubData('player','move','left',path)

            path = '../../assets/player/move/right/move_right_' + i + '.png'
            appendSpriteSubData('player','move','right',path)

        }





    }

    constructor() {
        this.loadImages()
        console.log("a")
    }


}