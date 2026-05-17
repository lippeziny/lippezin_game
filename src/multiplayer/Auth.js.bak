import { auth } from '../config/firebase.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { pouStateInstance } from '../core/PouState.js';
import { gameLoopInstance } from '../core/GameLoop.js';

const emailInput = document.getElementById('auth-email');
const passwordInput = document.getElementById('auth-password');

document.getElementById('btn-login').addEventListener('click', async () => {
    try {
        await signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
    } catch (err) { alert(`Erro no login: ${err.message}`); }
});

document.getElementById('btn-register').addEventListener('click', async () => {
    try {
        await createUserWithEmailAndPassword(auth, emailInput.value, passwordInput.value);
    } catch (err) { alert(`Erro no cadastro: ${err.message}`); }
});

onAuthStateChanged(auth, async (user) => {
    if (user) {
        document.getElementById('auth-screen').classList.remove('active');
        document.getElementById('game-screen').classList.add('active');
        
        // Carrega os dados do Pou e dispara os loops paralelos
        await pouStateInstance.loadOrCreatePou(user.uid, user.email);
        gameLoopInstance.start();
    } else {
        document.getElementById('auth-screen').classList.add('active');
        document.getElementById('game-screen').classList.remove('active');
    }
});
