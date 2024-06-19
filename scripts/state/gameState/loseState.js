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

        const video = document.createElement('video');
        video.src = '../../assets/transitions/lose/lose_n2.mp4';
        video.controls = false;
        video.autoplay = true;

        video.style.position = 'fixed';
        video.style.top = '0';
        video.style.left = '0';
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.zIndex = '1000';
        video.style.objectFit = 'cover';

        document.body.appendChild(video);

        // this.container.style.display = 'flex';
        this.canvas.style.display = 'none';
        this.form.style.display = 'none';

        video.addEventListener('ended', () => {
            video.style.display = 'none';
            window.location.href = './play.html'

        });
        this.statusText.innerHTML ="YOU LOSE"
    }


}