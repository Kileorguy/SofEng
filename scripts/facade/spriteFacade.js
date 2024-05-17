export class SpriteFacade {

    image = {
        player : {
            'attack' : [],
            'idle' : {
                'up' : [],
                'down' : [],
                'left' : [],
                'right' : [],
            },
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

        for (let i = 0; i <= 5; i++) {
            path = '../../assets/player/idle/up/sprite_' + i +'.png'
            appendSpriteSubData('player','idle','up',path)
            path = '../../assets/player/idle/left/sprite_' + i +'.png'
            appendSpriteSubData('player','idle','left',path)
        }
        // assets/player/idle/down/sprite_0.png
        for (let i = 0; i < 3; i++) {
            path = '../../assets/player/idle/down/sprite_' + i +'.png'
            appendSpriteSubData('player','idle','down',path)
        }
        for (let i = 0; i < 6; i++) {
            path = '../../assets/player/idle/right/sprite_' + i +'.png'
            appendSpriteSubData('player','idle','right',path)
        }

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