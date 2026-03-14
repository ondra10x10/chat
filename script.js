const channel = new BroadcastChannel('chat');
const form = document.getElementById('form');
const input = document.getElementById('input');
const messages = document.getElementById('messages');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value.trim()) {
    const msg = input.value.trim();
    channel.postMessage(msg);
    displayMessage(msg, 'my-message');
    input.value = '';
  }
});

channel.onmessage = function(e) {
  displayMessage(e.data, 'message');
};

function displayMessage(msg, className) {
  const item = document.createElement('div');
  item.textContent = msg;
  item.classList.add(className);
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
}