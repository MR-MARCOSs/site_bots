let selectedBot = null;

// Selecionar um bot e exibir a descrição inicial
function selectBot(botKey) {
    selectedBot = dados[name];
    const chatContainer = document.querySelector('.chat-conversation');
    chatContainer.innerHTML = ''; // Limpa o chat anterior
    appendMessage('bot', selectedBot.description);
}

// Enviar mensagem do usuário e receber a resposta do bot
function sendMessage() {
    const inputField = document.getElementById('userInput');
    const userMessage = inputField.value.trim();

    if (userMessage === '') return;

    appendMessage('user', userMessage);
    inputField.value = ''; // Limpa o campo de entrada

    // Simular a resposta do bot (aqui você pode integrar a IA)
    setTimeout(() => {
        const botResponse = `Você disse: "${userMessage}". Como posso ajudar mais?`;
        appendMessage('bot', botResponse);
    }, 1000);
}

// Função para adicionar mensagens ao chat
function appendMessage(sender, message) {
    const chatContainer = document.querySelector('.chat-conversation');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message`;
    messageDiv.textContent = message;
    chatContainer.appendChild(messageDiv);

    // Rola o chat para a mensagem mais recente
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Event listeners
document.getElementById('sendMessage').addEventListener('click', sendMessage);
document.getElementById('userInput').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') sendMessage();
});

// Exemplo de seleção de bot
selectBot('bot1'); // Chame essa função quando o bot for selecionado
