import {State} from "../state.js";
import {Game} from "../../gameLogic.js";

export class WinState extends State{

    constructor(game) {
        super();
        this.game = game;

        this.form = document.getElementById("gameForm");
        this.container = document.getElementById("outerResult");
        this.canvas = document.getElementById("canvas");
        this.statusText = document.getElementById("resultStatus");
    }

    updateState() {

    }

    startState(){
        this.container.style.display = 'flex';
        this.canvas.style.display = 'none';
        this.statusText.innerHTML ="CONGRATULATIONS, YOU HAVE DEFEATED THE BOSS"
        this.form.addEventListener('submit',(ev) => {
            ev.preventDefault();
            this.container.style.display = 'none';
            console.log('submitted')
        })
    }



}