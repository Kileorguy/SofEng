import {State} from "../state.js";

export class PlayerDefault extends State{
    constructor(player) {
        super();
        // console.log(player)
        this.player = player
        this.moveSpeed = player.movementSpeed
        this.keydown = false
        this.keydownListener = this.keydownListener.bind(this);
        this.keyupListener = this.keyupListener.bind(this);
    }
    keydownListener(event) {
        // console.log(this.player)
        let key = event.key;
        key = key.toLowerCase()
        // console.log(key)
        switch (key) {
            case 'arrowleft':{
                // setPlayer
                this.player.facing = 'a'
                this.player.vx = -this.moveSpeed
                this.keydown = true
                break
            }
            case 'arrowright':{
                this.player.facing = 'd'
                this.player.vx = this.moveSpeed
                this.keydown = true
                break
            }
            case 'arrowup':{
                this.player.facing = 'w'
                this.player.vy = -this.moveSpeed
                this.keydown = true
                break
            }
            case 'arrowdown':{
                this.player.facing = 's'
                this.player.vy = this.moveSpeed

                this.keydown = true
                break
            }
            case 'q':{
                this.player.attacking = true
                // setInterval(this.player.attacking=false,1000)

                // this.changeState(new PlayerAttack(this.player))
                break
            }
            case 'w':{
                break
            }
            case 'e':{
                break
            }
        }
    }
    keyupListener(event) {
        let key = event.key;
        key = key.toLowerCase()
        switch (key) {
            case 'arrowleft':{
                if(this.player.vx === -this.moveSpeed){
                    this.player.vx = 0
                }
                break
            }
            case 'arrowright':{

                if(this.player.vx === this.moveSpeed){
                    this.player.vx = 0
                }
                break
            }
            case 'arrowup':{
                if(this.player.vy === -this.moveSpeed){
                    this.player.vy = 0
                }
                break
            }
            case 'arrowdown':{
                if(this.player.vy === this.moveSpeed){
                    this.player.vy = 0
                }
                break
            }
        }
    }

    key


    startState() {
        document.addEventListener('keydown', this.keydownListener);
        document.addEventListener('keyup', this.keyupListener);
    }
    changeState(state) {
        document.removeEventListener('keydown', this.keydownListener);
        document.removeEventListener('keyup', this.keyupListener);

        this.player.state = state
        this.player.state.startState()
    }
    updateState(){
    }
}