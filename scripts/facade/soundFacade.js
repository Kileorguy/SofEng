export class SoundFacade {

    sounds = {
        bg : null,
        player : {
            'attack' : {
                'sound' : []
            },
            'move' : {
                'sound' : []
            },
            'dash' : {
                'sound' : []
            },
            'summon' : {
                'sound' : []
            },
            'block' : {
                'sound' : []
            },
            'slash' : {
                'sound' : []
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


    loadSounds() {
        const appendSoundSubData = (entity, subEntity, name, path) => {
            let sound = new Audio();
            sound.src = path;
            console.log(sound);
            this.sounds[entity][subEntity][name].push(sound)
        };
    
        let path = '';

        // Player ATTACK 
        for (let i = 1; i <= 10; i++) {
            path = '../../assets/player/attack/sound/Sound_ (' + i +').mp3'
            appendSoundSubData('player','attack','sound',path)
        }
        
        // Player DASH
        for (let i = 1; i <= 1 ; i++) {
            path = '../../assets/player/dash/sound/Sound_ (' + i +').mp3'
            appendSoundSubData('player','dash','sound',path)
        }

        // Player SHIELD
        for (let i = 1; i <= 1 ; i++) {
            path = '../../assets/player/block/sound/Sound_ (' + i +').mp3'
            appendSoundSubData('player','block','sound',path)
        }

    }

    constructor() {
        console.log("b")
        this.loadSounds()
    }

}