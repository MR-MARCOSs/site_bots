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
