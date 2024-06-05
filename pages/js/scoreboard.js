import {initializeApp} from "https://www.gstatic.com/firebasejs/10.12.1/firebase-app.js";
import {
    collection,
    getDocs,
    getFirestore,
    limit,
    orderBy,
    query
} from "https://cdnjs.cloudflare.com/ajax/libs/firebase/10.12.1/firebase-firestore.min.js";
import {getConfig} from "../../helper/firebaseConfigHelper.js"

async function getDatas(){
    const firebaseConfig = getConfig();
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const q = query(collection(db, 'scoreboard'), orderBy('time'), limit(3))
    return await getDocs(q)
}

getDatas().then((data) => {
    let i = 1
    let table = document.getElementById('global-rank-table')
    data.forEach((e) => {
        let name = e.data().username
        let second = e.data().time.seconds
        let minute = Math.floor(e.data().time.seconds/60)

        let tr1 = document.createElement('tr')
        let td1 = document.createElement('td')
        td1.innerHTML = `RANK ${i}`
        tr1.appendChild(td1)
        let tr2 = document.createElement('tr')
        let td2 = document.createElement('td')
        td2.innerHTML = name
        tr2.appendChild(td2)
        let tr3 = document.createElement('tr')
        let td3 = document.createElement('td')
        td3.innerHTML = `${minute}:${second}`
        tr3.appendChild(td3)
        i++
        table.appendChild(tr1)
        table.appendChild(tr2)
        table.appendChild(tr3)
    })
})

