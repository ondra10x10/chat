const channel = new BroadcastChannel('chat');
const form = document.getElementById('form');
const input = document.getElementById('input');
const messagesDiv = document.getElementById('messages');
const usernameInput = document.getElementById('username-input');
const setUsernameBtn = document.getElementById('set-username-btn');
const usernameSection = document.getElementById('username-section');

let username = localStorage.getItem('username');
let messages = JSON.parse(localStorage.getItem('messages')) || [];

if (username) {
  usernameSection.style.display = 'none';
  loadHistory();
} else {
  setUsernameBtn.addEventListener('click', () => {
    username = usernameInput.value.trim();
    if (username) {
      localStorage.setItem('username', username);
      usernameSection.style.display = 'none';
      loadHistory();
    }
  });
}

function loadHistory() {
  messages.forEach(msg => {
    displayMessage(msg, msg.username === username ? 'my-message' : 'message');
  });
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (username && input.value.trim()) {
    const msg = { text: input.value.trim(), username, timestamp: new Date().toISOString() };
    channel.postMessage(msg);
    messages.push(msg);
    localStorage.setItem('messages', JSON.stringify(messages));
    displayMessage(msg, 'my-message');
    input.value = '';
  }
});

channel.onmessage = function(e) {
  const msg = e.data;
  messages.push(msg);
  localStorage.setItem('messages', JSON.stringify(messages));
  displayMessage(msg, 'message');
};

function displayMessage(msg, className) {
  const time = new Date(msg.timestamp).toLocaleTimeString();
  const item = document.createElement('div');
  item.textContent = `[${time}] ${msg.username}: ${msg.text}`;
  item.classList.add(className);
  messagesDiv.appendChild(item);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}