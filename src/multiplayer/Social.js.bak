import { db } from '../config/firebase.js';
import { collection, getDocs, doc, updateDoc, increment, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import { pouStateInstance } from '../core/PouState.js';

const modal = document.getElementById('social-modal');
const socialBody = document.getElementById('social-body');

document.getElementById('btn-open-social').addEventListener('click', () => {
    modal.style.display = "block";
    loadLeaderboard();
});

document.querySelector('.close-btn').addEventListener('click', () => modal.style.display = "none");

async function loadLeaderboard() {
    socialBody.innerHTML = "Carregando ranking...";
    const q = query(collection(db, "pous"), orderBy("level", "desc"), limit(10));
    const snapshot = await getDocs(q);
    
    let html = `<table style="width:100%; text-align:left; border-collapse:collapse;">
                    <tr style="border-bottom: 2px solid #ccc;">
                        <th>Pou</th><th>Nível</th><th>Curtidas</th><th>Ação</th>
                    </tr>`;
    
    snapshot.forEach((pDoc) => {
        const data = pDoc.data();
        html += `<tr style="border-bottom: 1px solid #eee; height: 40px;">
                    <td>${data.name}</td>
                    <td>⭐ ${data.level}</td>
                    <td>❤️ ${data.likes}</td>
                    <td><button class="btn-visit" data-id="${pDoc.id}">Visitar</button></td>
                 </tr>`;
    });
    html += `</table>`;
    socialBody.innerHTML = html;

    // Vincula eventos de visitação
    document.querySelectorAll('.btn-visit').forEach(btn => {
        btn.addEventListener('click', (e) => visitFriend(e.target.dataset.id));
    });
}

async function visitFriend(friendId) {
    modal.style.display = "none";
    alert("Você está visitando a casa do seu amigo! Dê um like para ajudá-lo.");
    
    // Injeta mecânica temporária de Like flutuante na tela
    const hudContainer = document.getElementById('game-screen');
    const likeBtn = document.createElement('button');
    likeBtn.id = "temp-like-btn";
    likeBtn.innerText = "👍 Curtir este Pou";
    likeBtn.style.cssText = "position:absolute; bottom:80px; left:50%; transform:translateX(-50%); z-index:100; background:#e74c3c; color:white; border:none; padding:15px; border-radius:30px;";
    
    likeBtn.addEventListener('click', async () => {
        const friendRef = doc(db, "pous", friendId);
        await updateDoc(friendRef, { likes: increment(1) });
        alert("Você curtiu o Pou do seu amigo!");
        likeBtn.remove();
        // Recarrega o estado do jogador local retornando para sua própria instância
        window.location.reload(); 
    });
    
    hudContainer.appendChild(likeBtn);
}
