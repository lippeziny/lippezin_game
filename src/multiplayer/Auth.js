import { auth } from '../config/firebase.js';
import { signInAnonymously, GoogleAuthProvider, linkWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { pouStateInstance } from '../core/PouState.js';
import { gameLoopInstance } from '../core/GameLoop.js';
import './Social.js'; 

const playButton = document.getElementById('btn-play-guest');
const nicknameInput = document.getElementById('pou-nickname-input');
const saveAccountBtn = document.getElementById('btn-save-account');

playButton.addEventListener('click', async () => {
    const chosenName = nicknameInput.value.trim() || "Pou Convidado";
    sessionStorage.setItem('chosen_pou_name', chosenName);
    try {
        await signInAnonymously(auth);
    } catch (err) { alert(`Erro ao entrar: ${err.message}`); }
});

saveAccountBtn.addEventListener('click', async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    const provider = new GoogleAuthProvider();
    try {
        const result = await linkWithPopup(currentUser, provider);
        alert(`Conta salva com sucesso! Vinculada a: ${result.user.email}`);
        saveAccountBtn.style.display = 'none';
    } catch (error) {
        if (error.code === 'auth/credential-already-in-use') {
            alert("Esta conta Google já possui um Pou associado.");
        } else { alert(`Erro: ${error.message}`); }
    }
});

onAuthStateChanged(auth, async (user) => {
    if (user) {
        document.getElementById('auth-screen').classList.remove('active');
        document.getElementById('game-screen').classList.add('active');
        
        saveAccountBtn.style.display = user.isAnonymous ? 'inline-block' : 'none';

        const cachedName = sessionStorage.getItem('chosen_pou_name') || "Pou";
        await pouStateInstance.loadOrCreatePou(user.uid, cachedName);
        gameLoopInstance.start();
    } else {
        document.getElementById('auth-screen').classList.add('active');
        document.getElementById('game-screen').classList.remove('active');
    }
});
