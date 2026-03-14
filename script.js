// chat.js - Simple chat functionality script

class Chat {
    constructor() {
        this.messages = [];
    }

    sendMessage(user, text) {
        const message = { user, text, timestamp: new Date().toISOString() };
        this.messages.push(message);
        this.displayMessage(message);
    }

    displayMessage({ user, text, timestamp }) {
        console.log(`[${timestamp}] ${user}: ${text}`);
    }

    getMessages() {
        return this.messages;
    }
}

// Example usage
const chat = new Chat();
chat.sendMessage('User1', 'Hello, world!');
chat.sendMessage('User2', 'Hi there!');