import { rtdb } from '../config/firebase.js';
import { ref, set, onValue, update } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { auth } from '../config/firebase.js';

export class RealtimePvP {
    constructor(matchId) {
        this.matchId = matchId;
        this.matchRef = ref(rtdb, `matches/${matchId}`);
        this.mySymbol = 'X';
        this.currentTurn = 'X';
    }

    initMatch() {
        // Inicializa o tabuleiro no Realtime Database
        set(this.matchRef, {
            board: ["", "", "", "", "", "", "", "", ""],
            turn: "X",
            winner: "",
            players: { player1: auth.currentUser.uid, player2: "waiting_join" }
        });

        this.listenToMatchChanges();
    }

    listenToMatchChanges() {
        onValue(this.matchRef, (snapshot) => {
            const data = snapshot.val();
            if (!data) return;
            
            this.currentTurn = data.turn;
            this.renderBoard(data.board);

            if (data.winner) {
                alert(`Fim de jogo! Vencedor: ${data.winner}`);
            }
        });
    }

    makeMove(index) {
        if (this.currentTurn !== this.mySymbol) {
            alert("Não é o seu turno!");
            return;
        }

        const updates = {};
        updates[`/board/${index}`] = this.mySymbol;
        updates[`/turn`] = this.mySymbol === 'X' ? 'O' : 'X';
        
        update(this.matchRef, updates);
    }

    renderBoard(boardArray) {
        // Atualiza a UI injetada no modal dinamicamente
        const pvpContainer = document.getElementById('social-body');
        if(!document.getElementById('pvp-grid')) {
            pvpContainer.innerHTML = `<div id="pvp-grid" style="display:grid; grid-template-columns: repeat(3, 100px); gap:5px; justify-content:center; margin-top:20px;"></div>`;
        }
        
        const grid = document.getElementById('pvp-grid');
        grid.innerHTML = "";
        
        boardArray.forEach((cell, i) => {
            const cellBtn = document.createElement('button');
            cellBtn.style.cssText = "height:100px; font-size:24px; background:#fff; border:2px solid #333; color:#000;";
            cellBtn.innerText = cell;
            cellBtn.addEventListener('click', () => {
                if (cell === "") this.makeMove(i);
            });
            grid.appendChild(cellBtn);
        });
    }
}
