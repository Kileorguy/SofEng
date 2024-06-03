export class SpriteFacade {

    image = {
        bg : null,
        player : {
            'attack' : {
                'up' : [],
                'down' : [],
                'left' : [],
                'right' : [],
            },
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
            },
            'dash' : {
                'up' : [],
                'down' : [],
                'left' : [],
                'right' : [],
            },
            'summon' : {
                'summon' : []
            },
            'block' : {
                'block' : []
            },
            'slash' : {
                'up' : [],
                'down' : [],
                'left' : [],
                'right' : [],
            },
        },
        monkey : {
            'attack' : {
                'left' : [],
                'right' : [],
            },
            'move' : {
                'left' : [],
                'right' : [],
            }
        },
        enemy1 : {
            'attack' : {
                'attack' : []
            },
            'idle' : {
                'idle' : []
            }

        },
        enemy2 : {
            'attack' : {
                'attack' : []
            },
            'idle' : {
                'idle' : []
            },
            'summon' : {
                'summon' : []
            }

        },
        enemy3 : {
            'attack' : {
                'attack' : []
            },
            'idle' : {
                'idle' : []
            },
            'summon' : {
                'summon' : []
            },
            'laser' : {
                'laser' : []
            }

        },
        mage : {
            'attack' : {
                'attack' : []
            },
            'idle' : {
                'idle' : []
            },

        },
        entity : {

        },
        magic : {
            'magic' : {
                'magic' : [] 
            }
        },
        circleLight : {
            'orb' : {
                'orb' : []
            }
        }
        
    }


    loadImages(){
        let image = new Image()
        image.src = '/assets/backgrounds/Level_3.png'
        console.log(image)
        this.image['bg'] = image
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

        // Player IDLE : up down left right
        for (let i = 0; i <= 5; i++) {

            path = '../../assets/player/idle/up/sprite_' + i +'.png'
            appendSpriteSubData('player','idle','up',path)

            path = '../../assets/player/idle/down/sprite_' + i +'.png'
            appendSpriteSubData('player','idle','down',path)

            path = '../../assets/player/idle/left/sprite_' + i +'.png'
            appendSpriteSubData('player','idle','left',path)

            path = '../../assets/player/idle/right/sprite_' + i +'.png'
            appendSpriteSubData('player','idle','right',path)

        }

        // Player ATTACK : up down left right
        for (let i = 1; i <= 6; i++) {

            path = '../../assets/player/attack/up/sprite_' + i +'.png'
            appendSpriteSubData('player','attack','up',path)

            path = '../../assets/player/attack/down/sprite_' + i +'.png'
            appendSpriteSubData('player','attack','down',path)

            path = '../../assets/player/attack/left/sprite_' + i +'.png'
            appendSpriteSubData('player','attack','left',path)

            path = '../../assets/player/attack/right/sprite_' + i +'.png'
            appendSpriteSubData('player','attack','right',path)
        }

        // Player MOVE : up down left right
        for (let i = 1; i <= 6; i++) {

            path = '../../assets/player/move/down/sprite_' + i + '.png'
            appendSpriteSubData('player','move','down',path)

            path = '../../assets/player/move/up/sprite_' + i + '.png'
            appendSpriteSubData('player','move','up',path)

            path = '../../assets/player/move/left/sprite_' + i + '.png'
            appendSpriteSubData('player','move','left',path)

            path = '../../assets/player/move/right/sprite_' + i + '.png'
            appendSpriteSubData('player','move','right',path)

        }
        
        // Player DASH : up down left right
        for (let i = 0; i < 1 ; i++) {

            path = '../../assets/player/dash/up/sprite_' + i +'.png'
            appendSpriteSubData('player','dash','up',path)

            path = '../../assets/player/dash/down/sprite_' + i +'.png'
            appendSpriteSubData('player','dash','down',path)

            path = '../../assets/player/dash/left/sprite_' + i +'.png'
            appendSpriteSubData('player','dash','left',path)

            path = '../../assets/player/dash/right/sprite_' + i +'.png'
            appendSpriteSubData('player','dash','right',path)

        }

        // Player SHIELD : shield
        for (let i = 0; i < 15 ; i++) {

            path = '../../assets/player/block/block/sprite_' + i.toString().padStart(2,'0') +'.png'
            appendSpriteSubData('player','block','block',path)

        }

        // Player SUMMON : summon
        for (let i = 0; i <= 12 ; i++) {

            path = '../../assets/player/summon/summon/sprite_' + i.toString().padStart(2,'0') +'.png'
            appendSpriteSubData('player','summon','summon',path)

        }

/////////////////////////////////////////////////////////////////////////////////////////////////

        // Slash : up down right left
        // for (let i = 0; i < 2 ; i++) {

        //     path = '../../assets/player/slash/down/sprite_' + i + '.png'
        //     appendSpriteSubData('player','slash','down',path)

        //     path = '../../assets/player/slash/up/sprite_' + i + '.png'
        //     appendSpriteSubData('player','slash','up',path)

        //     path = '../../assets/player/slash/left/sprite_' + i + '.png'
        //     appendSpriteSubData('player','slash','left',path)

        //     path = '../../assets/player/slash/right/sprite_' + i + '.png'
        //     appendSpriteSubData('player','slash','right',path)

        // }

/////////////////////////////////////////////////////////////////////////////////////////////////
        // Monkey MOVE : left right
        for (let i = 0; i <= 4; i++) {

        path = '../../assets/monkey/move/left/sprite_' + i +'.png'
        appendSpriteSubData('monkey','move','left',path)

        path = '../../assets/monkey/move/right/sprite_' + i +'.png'
        appendSpriteSubData('monkey','move','right',path)

        }

        // Monkey ATTACK : left right
        for (let i = 0; i <= 7; i++) {

            path = '../../assets/monkey/attack/left/sprite_' + i +'.png'
            appendSpriteSubData('monkey','attack','left',path)

            path = '../../assets/monkey/attack/right/sprite_' + i +'.png'
            appendSpriteSubData('monkey','attack','right',path)

        }

/////////////////////////////////////////////////////////////////////////////////////////////////

        // Rangda1 ATTACK : attack
        for (let i = 0; i <= 7; i++) {

            path = '../../assets/rangdap1/attack/attack/sprite_' + i +'.png'
            appendSpriteSubData('enemy1','attack','attack',path)

        }
        // Rangda1 IDLE : idle
        for (let i = 0; i <= 15; i++) {

            path = '../../assets/rangdap1/idle/idle/sprite_' + i.toString().padStart(2,'0') +'.png'
            appendSpriteSubData('enemy1','idle','idle',path)

        }

        // Rangda2 IDLE : idle
        for (let i = 0; i <= 5; i++) {

            path = '../../assets/rangdap2/idle/idle/sprite_' + i +'.png'
            appendSpriteSubData('enemy2','idle','idle',path)

        }

        // Rangda2 ATTACK : attack
        for (let i = 0; i <= 7; i++) {

            path = '../../assets/rangdap2/attack/attack/sprite_' + i +'.png'
            appendSpriteSubData('enemy2','attack','attack',path)

        }

        // Rangda2 SUMMON : summon
        for (let i = 0; i <= 16; i++) {

            path = '../../assets/rangdap2/summon/summon/sprite_' + i.toString().padStart(2,'0') +'.png'
            appendSpriteSubData('enemy2','summon','summon',path)

        }

        // Rangda3 IDLE : idle
        for (let i = 0; i <= 2; i++) {

            path = '../../assets/rangdap3/idle/idle/sprite_' + i +'.png'
            appendSpriteSubData('enemy3','idle','idle',path)

        }

        // Rangda3 ATTACK : attack
        for (let i = 0; i <= 7; i++) {

            path = '../../assets/rangdap3/attack/attack/sprite_' + i +'.png'
            appendSpriteSubData('enemy3','attack','attack',path)

        }

        // Rangda3 SUMMON : summon
        for (let i = 0; i <= 16; i++) {

            path = '../../assets/rangdap3/summon/summon/sprite_' + i.toString().padStart(2,'0') +'.png'
            appendSpriteSubData('enemy3','summon','summon',path)

        }

        // Rangda3  LASER : laser
        for (let i = 0; i <= 19; i++) {

            path = '../../assets/rangdap3/laser/laser/sprite_' + i.toString().padStart(2,'0') +'.png'
            appendSpriteSubData('enemy3','laser','laser',path)

        }

/////////////////////////////////////////////////////////////////////////////////////////////////
        
        // Mage ATTACK : attack
        for (let i = 0; i <= 4; i++) {

            path = '../../assets/leyak/attack/attack/sprite_' + i +'.png'
            appendSpriteSubData('mage','attack','attack',path)

        }
        // Mage IDLE : idle
        for (let i = 0; i <= 4; i++) {

            path = '../../assets/leyak/idle/idle/sprite_' + i +'.png'
            appendSpriteSubData('mage','idle','idle',path)

        }

/////////////////////////////////////////////////////////////////////////////////////////////////

        // Magic MAGIC : magic
        for (let i = 0; i <= 6 ; i++) {
            
            path = '../../assets/keris/keris/sprite_' + i +'.png'
            console.log(path);
            appendSpriteSubData('magic','magic','magic',path)

        }

        // CircleLight ORB : orb
        for (let i = 0; i <= 7 ; i++) {

            path = '../../assets/magic/magic/sprite_' + i +'.png'
            appendSpriteSubData('circleLight','orb','orb',path)

        }



    }

    constructor() {
        this.loadImages()
        // console.log("a")
    }


}