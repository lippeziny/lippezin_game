import { db } from '../config/firebase.js';
import { doc, getDoc, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

export class PouState {
    constructor() {
        this.currentPou = null;
        this.docRef = null;
    }

    async loadOrCreatePou(userId, email) {
        this.docRef = doc(db, "pous", userId);
        const docSnap = await getDoc(this.docRef);

        if (docSnap.exists()) {
            this.currentPou = docSnap.data();
            this.applyOfflineDecay();
        } else {
            // Inicialização padrão do Pou
            this.currentPou = {
                name: email.split('@')[0],
                level: 1,
                xp: 0,
                coins: 150,
                hunger: 100,
                health: 100,
                fun: 100,
                energy: 100,
                isSleeping: false,
                color: "#b5835a",
                likes: 0,
                lastUpdate: Date.now()
            };
            await setDoc(this.docRef, this.currentPou);
        }
        this.updateHUD();
        return this.currentPou;
    }

    applyOfflineDecay() {
        const now = Date.now();
        const elapsedHours = (now - this.currentPou.lastUpdate) / (1000 * 60 * 60);

        // Algoritmo determinístico de decaimento offline
        this.currentPou.hunger = Math.max(0, this.currentPou.hunger - (5 * elapsedHours));
        this.currentPou.fun = Math.max(0, this.currentPou.fun - (8 * elapsedHours));
        
        if (this.currentPou.isSleeping) {
            this.currentPou.energy = Math.min(100, this.currentPou.energy + (15 * elapsedHours));
        } else {
            this.currentPou.energy = Math.max(0, this.currentPou.energy - (4 * elapsedHours));
        }

        if (this.currentPou.hunger === 0) {
            this.currentPou.health = Math.max(10, this.currentPou.health - (10 * elapsedHours));
        }

        this.currentPou.lastUpdate = now;
        this.saveToCloud();
    }

    async saveToCloud() {
        if (!this.docRef) return;
        this.currentPou.lastUpdate = Date.now();
        await updateDoc(this.docRef, this.currentPou);
    }

    addXp(amount) {
        this.currentPou.xp += amount;
        const nextLevelXp = this.currentPou.level * 100;
        if (this.currentPou.xp >= nextLevelXp) {
            this.currentPou.xp -= nextLevelXp;
            this.currentPou.level++;
            this.currentPou.coins += 50; // Bônus de nível
            alert(`Parabéns! Seu Pou subiu para o Nível ${this.currentPou.level}!`);
        }
        this.updateHUD();
    }

    updateHUD() {
        document.getElementById('bar-hunger').style.width = `${this.currentPou.hunger}%`;
        document.getElementById('bar-health').style.width = `${this.currentPou.health}%`;
        document.getElementById('bar-fun').style.width = `${this.currentPou.fun}%`;
        document.getElementById('bar-energy').style.width = `${this.currentPou.energy}%`;
        document.getElementById('pou-name').innerText = this.currentPou.name;
        document.getElementById('pou-level').innerText = `Nível: ${this.currentPou.level}`;
        document.getElementById('pou-coins').innerText = `🪙 ${Math.floor(this.currentPou.coins)}`;

        // Renderização de expressões baseadas em estados críticas
        const pouEl = document.getElementById('pou-character');
        pouEl.className = ""; 
        if (this.currentPou.hunger < 30 || this.currentPou.health < 40) {
            pouEl.classList.add('sad');
        } else {
            pouEl.classList.add('happy');
        }
    }
}
export const pouStateInstance = new PouState();
