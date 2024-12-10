// Chatbot
const chatToggle = document.getElementById('chatToggle');
const chatWindow = document.getElementById('chatbot');
const closeChat = document.getElementById('closeChat');
const sendButton = document.getElementById('sendButton');
const userInput = document.getElementById('userInput');
const chatMessages = document.getElementById('chatMessages');

chatToggle.addEventListener('click', () => {
    chatWindow.style.display = 'flex';
});

closeChat.addEventListener('click', () => {
    chatWindow.style.display = 'none';
});

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

function sendMessage() {
    const userMessage = userInput.value;
    if (userMessage) {
        const userMessageElement = document.createElement('div');
        userMessageElement.classList.add('message', 'user-message');
        userMessageElement.innerText = userMessage;
        chatMessages.appendChild(userMessageElement);
        userInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('typing-indicator');
        typingIndicator.innerText = 'FerroSanti está escribiendo...';
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        setTimeout(() => {
            typingIndicator.remove();
            const botMessageElement = document.createElement('div');
            botMessageElement.classList.add('message', 'bot-message');
            let response = "Lo siento, no entendí tu pregunta. Por favor, intenta de nuevo.";
            if (userMessage.toLowerCase().includes("hola")) {
                response = "¡Hola! 😊 ¿En qué puedo ayudarte hoy?";
            } else if (userMessage.toLowerCase().includes("horarios")) {
                response = "Nuestros horarios son: Lunes a Viernes (09:00 a 19:00) y Sábados (09:00 a 14:00).";
            } else if (userMessage.toLowerCase().includes("productos")) {
                response = "Puedes ver nuestros productos en la sección de productos en la web.";
            }
            botMessageElement.innerText = response;
            chatMessages.appendChild(botMessageElement);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1500);
    }
}