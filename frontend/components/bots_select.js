document.addEventListener('DOMContentLoaded', () => {
    let section = document.getElementById("bots-list");
    let resultados = '';
    let chatConversation = document.querySelector('.chat-conversation');
    let inputContainer = document.querySelector('.input-container');
    let selectedItem = null;
    let sendMessageButton = document.querySelector('.fa-paper-plane');  // Seleciona o ícone de envio
    let inputField = document.getElementById('userInput');  // Seleciona o campo de entrada

    // Função para enviar a mensagem
// Função para enviar a mensagem
// Função para enviar a mensagem
function sendMessage() {
    const userMessage = inputField.value.trim();

    if (userMessage === '') return;  // Se a mensagem estiver vazia, não faz nada

    appendMessage('user', userMessage);  // Adiciona a mensagem do usuário ao chat
    inputField.value = '';  // Limpa o campo de input

    // Chama a rota para obter a resposta do bot
    fetch('http://localhost:3000/get-response', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chatId: 1,  // Exemplo de chatId
            userMessage: userMessage
        })
    })
    .then(response => response.json())  // Processa a resposta da API
    .then(data => {
        const botResponse = data.response;  // A resposta do bot
        appendMessage('bot', botResponse);  // Adiciona a resposta do bot ao chat
    })
    .catch(error => {
        console.error('Erro ao obter resposta do bot:', error);
        appendMessage('bot', 'Desculpe, houve um erro ao processar sua solicitação.');  // Mensagem de erro
    });
}


    // Função para adicionar uma mensagem ao chat
    function appendMessage(sender, message) {
        const chatContainer = document.querySelector('.chat-conversation');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message`;
        messageDiv.textContent = message;
        chatContainer.appendChild(messageDiv);

        chatContainer.scrollTop = chatContainer.scrollHeight;  // Rola até o final da conversa
    }

    // Configurar o evento de clicar no ícone do avião de papel
    sendMessageButton.addEventListener('click', sendMessage);

    // Configurar o evento de pressionar "Enter" para enviar mensagem
    inputField.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') sendMessage();  // Envia a mensagem quando a tecla "Enter" for pressionada
    });

    // Carregar os bots
    fetch('http://localhost:3000/get-bots')
        .then(response => response.json())
        .then(dados => {
            for (let dado of dados) {
                let name = dado.name;
                let descricao = dado.descricao;
                let img = dado.img;
                resultados += `
                    <div class="item-resultado" data-name="${name}">
                        <img src="${img}" alt="${name}" class="bot-image">
                        <div class="item-text">
                            <h2><a>${name}</a></h2>
                            <p class="descricao-meta">${descricao}</p>
                        </div>
                    </div>`;
            }
            section.innerHTML = resultados;  // Preenche a lista de bots no HTML

            // Adicionando os eventos aos itens dinamicamente
            const items = document.querySelectorAll('.item-resultado');
            items.forEach(item => {
                item.addEventListener('click', () => selectBot(item));
            });
        })
        .catch(error => {
            console.error('Erro ao carregar bots:', error);
        });

    // Função para selecionar o bot
    function selectBot(item) {
        const botName = item.getAttribute('data-name');

        fetch('http://localhost:3000/get-bots')
            .then(response => response.json())
            .then(dados => {
                const bot = dados.find(d => d.name === botName);

                if (bot) {
                    chatConversation.innerHTML = '';
                    const chatContainer = document.querySelector('.chat-conversation');
                    const mensagemInicial = document.createElement('div');
                    mensagemInicial.className = `chat-message bot-message msg-inicial`;
                    mensagemInicial.textContent = bot.descricao;
                    chatContainer.appendChild(mensagemInicial);

                    inputContainer.style.display = 'flex';
                    inputField.disabled = false;  // Habilita o campo de entrada de texto

                    // Remove o estilo de item selecionado anterior, se existir
                    if (selectedItem) {
                        selectedItem.style.backgroundColor = '';
                    }

                    // Destaca o item clicado
                    item.style.backgroundColor = 'purple';

                    selectedItem = item;  // Atualiza o item selecionado
                }
            })
            .catch(error => {
                console.error('Erro ao selecionar bot:', error);
            });
    }
});
