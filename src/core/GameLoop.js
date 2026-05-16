import { pouStateInstance } from './PouState.js';

class GameLoop {
    constructor() {
        this.tickRate = 60000; // 1 minuto por tick interno
        this.intervalId = null;
    }

    start() {
        if (this.intervalId) return;
        this.intervalId = setInterval(() => {
            this.tick();
        }, this.tickRate);
    }

    tick() {
        const pou = pouStateInstance.currentPou;
        if (!pou) return;

        // Decaimento em tempo real fracionado por minuto (1 hora = 60 ticks)
        pou.hunger = Math.max(0, pou.hunger - (5 / 60));
        pou.fun = Math.max(0, pou.fun - (8 / 60));
        
        if (pou.isSleeping) {
            pou.energy = Math.min(100, pou.energy + (20 / 60));
        } else {
            pou.energy = Math.max(0, pou.energy - (4 / 60));
        }

        if (pou.hunger <= 0) {
            pou.health = Math.max(0, pou.health - (5 / 60));
        }

        pouStateInstance.updateHUD();
        
        // Auto-save em nuvem a cada 5 ticks para economizar cota de gravação do Firestore
        if (Math.random() < 0.2) {
            pouStateInstance.saveToCloud();
        }
    }
}
export const gameLoopInstance = new GameLoop();
