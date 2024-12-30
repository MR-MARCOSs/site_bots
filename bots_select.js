let section = document.getElementById("bots-list");
let resultados = '';
let chatConversation = document.querySelector('.chat-conversation');
let inputContainer = document.querySelector('.input-container');
// Variável para rastrear o item selecionado atualmente
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
        chatConversation.innerHTML = ''; // Limpa a mensagem inicial
        const chatContainer = document.querySelector('.chat-conversation');
        const mensagemInicial = document.createElement('div');
        mensagemInicial.className = `chat-message bot-message`;
        mensagemInicial.textContent = bot.descricao;
        chatContainer.appendChild(mensagemInicial);

        inputContainer.style.display = 'flex'; // Mostra o input


        // Remove a cor roxa do item anteriormente selecionado
        if (selectedItem) {
            selectedItem.style.backgroundColor = '';
        }

        // Encontra o novo item selecionado e adiciona a cor roxa
        const newItem = document.querySelector(`.item-resultado[onclick="selectBot('${botName}')"]`);
        newItem.style.backgroundColor = 'purple'; // Define a cor de fundo como roxa

        // Atualiza o item selecionado atualmente
        selectedItem = newItem;


    }
}

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
    }, 500);
}
