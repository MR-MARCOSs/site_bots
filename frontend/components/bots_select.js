let section = document.getElementById("bots-list");
let resultados = '';
let chatConversation = document.querySelector('.chat-conversation');
let inputContainer = document.querySelector('.input-container');
let selectedItem = null;

for (let dado of dados) {
    let name = dado.name;
    let descricao = dado.descricao;
    let img = dado.img;
    resultados += `
        <div class="item-resultado" onclick="selectBot('${name}')">
            <img src="${img}" alt="${name}" class="bot-image">
            <div class="item-text">
                <h2><a>${name}</a></h2>
                <p class="descricao-meta">${descricao}</p>
            </div>
        </div>`;
}
section.innerHTML = resultados;

function selectBot(botName) {
    const bot = dados.find(d => d.name === botName);

    if (bot) {
        chatConversation.innerHTML = '';
        const chatContainer = document.querySelector('.chat-conversation');
        const mensagemInicial = document.createElement('div');
        mensagemInicial.className = `chat-message bot-message msg-inicial`;
        mensagemInicial.textContent = bot.descricao;
        chatContainer.appendChild(mensagemInicial);

        inputContainer.style.display = 'flex';
        const inputField = document.getElementById('userInput');
        inputField.disabled = false;

        if (selectedItem) {
            selectedItem.style.backgroundColor = '';
        }

        const newItem = document.querySelector(`.item-resultado[onclick="selectBot('${botName}')"]`);
        newItem.style.backgroundColor = 'purple';

        selectedItem = newItem;
    }
}

function appendMessage(sender, message) {
    const chatContainer = document.querySelector('.chat-conversation');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;
    messageDiv.textContent = message;
    chatContainer.appendChild(messageDiv);

    chatContainer.scrollTop = chatContainer.scrollHeight;
}

document.getElementById('sendMessage').addEventListener('click', sendMessage);
document.getElementById('userInput').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') sendMessage();
});

function sendMessage() {
    const inputField = document.getElementById('userInput');
    const userMessage = inputField.value.trim();

    if (userMessage === '') return;

    appendMessage('user', userMessage);
    inputField.value = '';

    setTimeout(() => {
        const botResponse = `Você disse: "${userMessage}". Como posso ajudar mais?`;
        appendMessage('bot', botResponse);
    }, 500);
}
