import {State} from "../state.js";
import {Game} from "../../gameLogic.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import {getFirestore,collection, addDoc} from "https://cdnjs.cloudflare.com/ajax/libs/firebase/10.12.1/firebase-firestore.min.js";
import {getConfig} from "../../../helper/firebaseConfigHelper.js"

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

    async inputPlayer(){
        let name = document.getElementById('usernameField').value
        const firebaseConfig = getConfig();
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        let col = collection(db, 'scoreboard')
        await addDoc(col, {username: name, time : new Date(this.game.endTime - this.game.startTime)})
    }

    startState(){
        this.game.endTime = Date.now()
        this.container.style.display = 'flex';
        this.canvas.style.display = 'none';

        const video = document.createElement('video');
        video.src = '../../assets/transitions/win/win_n2.mp4';
        video.controls = false;
        video.autoplay = true;
        video.style.position = 'fixed';
        video.style.top = '0';
        video.style.left = '0';
        video.style.width = '100%';
        video.style.height = '100%';
        video.style.zIndex = '1000';
        video.style.objectFit = 'cover';

        video.addEventListener('ended', () => {
            video.style.display = 'none';
        });

        document.body.appendChild(video);

        this.statusText.innerHTML ="CONGRATULATIONS, YOU HAVE DEFEATED THE BOSS"
        this.form.addEventListener('submit',(ev) => {
            ev.preventDefault();
            this.inputPlayer().then(r =>{
                window.location.href = './play.html';
            } );

        })
    }



}