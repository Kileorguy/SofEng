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
        this.statusText.innerHTML ="CONGRATULATIONS, YOU HAVE DEFEATED THE BOSS"
        this.form.addEventListener('submit',(ev) => {
            ev.preventDefault();
            this.inputPlayer().then(r =>{
                window.location.href = './play.html';
            } );

        })
    }



}