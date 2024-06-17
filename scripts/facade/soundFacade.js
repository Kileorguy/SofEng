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
                'sound' : [],
            },
            'move' : {
                'sound' : [],
            }
        },
        enemy1 : {
            'attack' : {
                'sound' : []
            },
            'idle' : {
                'idle' : []
            }

        },
        enemy2 : {
            'attack' : {
                'sound' : []
            },
            'idle' : {
                'idle' : []
            },
            'summon' : {
                'sound' : []
            }

        },
        enemy3 : {
            'attack' : {
                'sound' : []
            },
            'idle' : {
                'idle' : []
            },
            'summon' : {
                'sound' : []
            },
            'laser' : {
                'sound' : []
            }

        },
        mage : {
            'attack' : {
                'sound' : []
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

        // Player SUMMON
        for (let i = 1; i <= 1 ; i++) {
            path = '../../assets/player/summon/sound/Sound_ (' + i +').mp3'
            appendSoundSubData('player','summon','sound',path)
        }

        // Monkey Attack
        for (let i = 1; i <= 1 ; i++) {
            path = '../../assets/monkey/attack/sound/Sound_ (' + i +').mp3'
            appendSoundSubData('monkey','attack','sound',path)
        }

        // Monkey Move
        for (let i = 1; i <= 1 ; i++) {
            path = '../../assets/monkey/move/sound/Sound_ (' + i +').mp3'
            appendSoundSubData('monkey','move','sound',path)
        }

        // Rangdap1 Attack
        for (let i = 1; i <= 1 ; i++) {
            path = '../../assets/rangdap1/attack/sound/Sound_ (' + i +').mp3'
            appendSoundSubData('enemy1','attack','sound',path)
        }

        // Rangdap2 Attack
        for (let i = 1; i <= 1 ; i++) {
            path = '../../assets/rangdap2/attack/sound/Sound_ (' + i +').mp3'
            appendSoundSubData('enemy2','attack','sound',path)
        }

        // Rangdap2 Attack
        for (let i = 1; i <= 1 ; i++) {
            path = '../../assets/rangdap3/attack/sound/Sound_ (' + i +').mp3'
            appendSoundSubData('enemy3','attack','sound',path)
        }

        // Rangdap2 Attack
        for (let i = 1; i <= 1 ; i++) {
            path = '../../assets/leyak/attack/sound/Sound_ (' + i +').mp3'
            appendSoundSubData('mage','attack','sound',path)
        }


    }

    constructor() {
        console.log("b")
        this.loadSounds()
    }

}