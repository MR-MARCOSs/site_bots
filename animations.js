function toggleChatbots() {
    // Verifica se a largura da tela está dentro das dimensões do media query
    if (window.matchMedia("(max-width: 768px)").matches) {
        const chatbots = document.querySelector('.chatbots');
        const chatConversation = document.querySelector('.chat-conversation');
        const inputContainer = document.querySelector('.input-container');
        const arrow = document.querySelector('.arrow');
        const arrowIcon = document.querySelector('.arrow i');

        // Alterna a visibilidade do chatbots
        chatbots.classList.toggle('show'); 

        // Verifica se a seta está visível ou não
        if (arrowIcon.classList.contains('fa-arrow-left')) {
            // Se estiver visível, remove as classes de movimento reverso
            if (chatbots.classList.contains('move-left-reverse')) {
                chatbots.classList.remove('move-left-reverse');
                chatConversation.classList.remove('move-center-reverse');
                inputContainer.classList.remove('move-input-center-reverse');
                arrow.classList.remove('arrow-move-reverse');
            }

            // Adiciona as classes de movimento
            arrowIcon.classList.remove('fa-arrow-left');

        } else {
            // Se não estiver visível, remove as classes de movimento
            chatbots.classList.remove('move-left');
            chatConversation.classList.remove('move-center');
            inputContainer.classList.remove('move-input-center');
            arrow.classList.remove('arrow-move');
            arrowIcon.classList.remove('fa-arrow-right');
        }
    }
}

// Associa o clique na seta para exibir ou ocultar os chatbots
document.querySelector('.arrow').addEventListener('click', toggleChatbots);




function animation() {
    const arrow = document.querySelector('.arrow');
    const arrowIcon = document.querySelector('.arrow i');
    const chatbots = document.querySelector('.chatbots');
    const chatConversation = document.querySelector('.chat-conversation');
    const inputContainer = document.querySelector('.input-container');
    
    if (arrowIcon.classList.contains('fa-arrow-left')) {
        if (chatbots.classList.contains('move-left-reverse')) {
            chatbots.classList.remove('move-left-reverse');
            chatConversation.classList.remove('move-center-reverse');
            inputContainer.classList.remove('move-input-center-reverse');
            arrow.classList.remove('arrow-move-reverse');
        }

        chatbots.classList.add('move-left');
        chatConversation.classList.add('move-center');
        arrow.classList.add('arrow-move');
        inputContainer.classList.add('move-input-center');

        arrowIcon.classList.remove('fa-arrow-left');
        arrowIcon.classList.add('fa-arrow-right');
    } else {
        chatbots.classList.add('move-left-reverse');
        chatConversation.classList.add('move-center-reverse');
        arrow.classList.add('arrow-move-reverse');
        inputContainer.classList.add('move-input-center-reverse');

        chatbots.classList.remove('move-left');
        chatConversation.classList.remove('move-center');
        inputContainer.classList.remove('move-input-center');
        
        arrow.classList.remove('arrow-move');
        arrowIcon.classList.remove('fa-arrow-right');
        arrowIcon.classList.add('fa-arrow-left');
    }
}
