import { pouStateInstance } from './PouState.js';

class GameLoop {
    constructor() {
        this.tickRate = 60000; 
        this.intervalId = null;
    }

    start() {
        if (this.intervalId) return;
        this.intervalId = setInterval(() => this.tick(), this.tickRate);
    }

    tick() {
        const pou = pouStateInstance.currentPou;
        if (!pou) return;

        pou.hunger = Math.max(0, pou.hunger - (5 / 60));
        pou.fun = Math.max(0, pou.fun - (8 / 60));
        pou.energy = pou.isSleeping ? Math.min(100, pou.energy + (20 / 60)) : Math.max(0, pou.energy - (4 / 60));

        if (pou.hunger <= 0) pou.health = Math.max(0, pou.health - (5 / 60));

        pouStateInstance.updateHUD();
        if (Math.random() < 0.2) pouStateInstance.saveToCloud();
    }
}
export const gameLoopInstance = new GameLoop();
