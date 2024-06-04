import {State} from "../state.js";
import {Game} from "../../gameLogic.js";
export class LoseState extends State{

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
        this.form.style.display = 'none';
        this.statusText.innerHTML ="YOU LOSE"
        setTimeout(() => {
            window.location.href = './play.html'
        }, 3000)
    }


}