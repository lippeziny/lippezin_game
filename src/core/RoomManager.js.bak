class RoomManager {
    constructor() {
        this.rooms = ['kitchen', 'bathroom', 'lab', 'bedroom', 'gameroom'];
        this.currentIndex = 0;
        this.roomContent = document.getElementById('room-content');
    }

    init() {
        document.getElementById('nav-left').addEventListener('click', () => this.navigate(-1));
        document.getElementById('nav-right').addEventListener('click', () => this.navigate(1));
    }

    navigate(direction) {
        this.currentIndex += direction;
        if (this.currentIndex < 0) this.currentIndex = this.rooms.length - 1;
        if (this.currentIndex >= this.rooms.length) this.currentIndex = 0;

        const currentRoom = this.rooms[this.currentIndex];
        this.roomContent.className = currentRoom;
        
        this.triggerRoomBehavior(currentRoom);
    }

    triggerRoomBehavior(room) {
        // Remove elementos flutuantes do cômodo anterior
        const items = document.querySelectorAll('.room-item');
        items.forEach(item => item.remove());

        if (room === 'kitchen') {
            // Exemplo: injetar comida arrastável
            console.log("Entrou na Cozinha: Geladeira pronta.");
        }
    }
}
const roomManager = new RoomManager();
roomManager.init();
