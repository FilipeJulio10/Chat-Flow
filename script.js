// Dados simulados para conversas e mensagens
const conversations = [
    {
        id: 1,
        name: "João Silva",
        avatar: "https://via.placeholder.com/49x49/128C7E/ffffff?text=J",
        lastMessage: "Oi, tudo bem?",
        time: "14:30",
        unread: 2,
        status: "online",
        messages: [
            { id: 1, text: "Oi, tudo bem?", time: "14:30", type: "received" },
            { id: 2, text: "Oi! Tudo bem sim, e você?", time: "14:32", type: "sent" },
            { id: 3, text: "Tudo ótimo! Vamos sair hoje?", time: "14:35", type: "received" }
        ]
    },
    {
        id: 2,
        name: "Maria Santos",
        avatar: "https://via.placeholder.com/49x49/25D366/ffffff?text=M",
        lastMessage: "Valeu! Até amanhã",
        time: "13:45",
        unread: 0,
        status: "offline",
        messages: [
            { id: 1, text: "Oi Maria!", time: "13:40", type: "sent" },
            { id: 2, text: "Oi! Como vai?", time: "13:42", type: "received" },
            { id: 3, text: "Tudo bem! Vamos marcar algo?", time: "13:43", type: "sent" },
            { id: 4, text: "Valeu! Até amanhã", time: "13:45", type: "received" }
        ]
    },
    {
        id: 3,
        name: "Pedro Costa",
        avatar: "https://via.placeholder.com/49x49/667781/ffffff?text=P",
        lastMessage: "Beleza, combinado!",
        time: "12:20",
        unread: 1,
        status: "online",
        messages: [
            { id: 1, text: "E aí Pedro!", time: "12:15", type: "sent" },
            { id: 2, text: "Fala! Tudo bem?", time: "12:17", type: "received" },
            { id: 3, text: "Beleza, combinado!", time: "12:20", type: "received" }
        ]
    },
    {
        id: 4,
        name: "Ana Oliveira",
        avatar: "https://via.placeholder.com/49x49/202c33/ffffff?text=A",
        lastMessage: "Perfeito! 😊",
        time: "11:30",
        unread: 0,
        status: "offline",
        messages: [
            { id: 1, text: "Oi Ana!", time: "11:25", type: "sent" },
            { id: 2, text: "Oi! Tudo bem?", time: "11:27", type: "received" },
            { id: 3, text: "Tudo! E você?", time: "11:28", type: "sent" },
            { id: 4, text: "Perfeito! 😊", time: "11:30", type: "received" }
        ]
    },
    {
        id: 5,
        name: "Carlos Lima",
        avatar: "https://via.placeholder.com/49x49/374045/ffffff?text=C",
        lastMessage: "Valeu! 👍",
        time: "10:15",
        unread: 0,
        status: "online",
        messages: [
            { id: 1, text: "Fala Carlos!", time: "10:10", type: "sent" },
            { id: 2, text: "E aí! Tudo bem?", time: "10:12", type: "received" },
            { id: 3, text: "Tudo! Valeu! 👍", time: "10:15", type: "received" }
        ]
    }
];

// Estado da aplicação
let currentConversation = null;
let currentUser = {
    name: "Meu Perfil",
    avatar: "https://via.placeholder.com/40x40/25D366/ffffff?text=U"
};

// Elementos DOM
const conversationsList = document.getElementById('conversationsList');
const messagesContainer = document.getElementById('messagesContainer');
const messageInput = document.getElementById('messageInput');
const searchInput = document.querySelector('.search-input');
const contactName = document.querySelector('.contact-name');
const contactStatus = document.querySelector('.contact-status');
const contactPic = document.querySelector('.contact-pic');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    renderConversations();
    setupEventListeners();
});

// Configurar event listeners
function setupEventListeners() {
    // Envio de mensagem
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Pesquisa de conversas
    searchInput.addEventListener('input', function(e) {
        filterConversations(e.target.value);
    });

    // Auto-resize do input
    messageInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 100) + 'px';
    });
}

// Renderizar lista de conversas
function renderConversations() {
    conversationsList.innerHTML = '';
    
    conversations.forEach(conversation => {
        const conversationElement = createConversationElement(conversation);
        conversationsList.appendChild(conversationElement);
    });
}

// Criar elemento de conversa
function createConversationElement(conversation) {
    const div = document.createElement('div');
    div.className = 'conversation-item';
    div.dataset.conversationId = conversation.id;
    
    div.innerHTML = `
        <img src="${conversation.avatar}" alt="${conversation.name}" class="conversation-avatar">
        <div class="conversation-content">
            <div class="conversation-header">
                <span class="conversation-name">${conversation.name}</span>
                <span class="conversation-time">${conversation.time}</span>
            </div>
            <div class="conversation-message">${conversation.lastMessage}</div>
        </div>
        ${conversation.unread > 0 ? `<div class="unread-badge">${conversation.unread}</div>` : ''}
    `;
    
    div.addEventListener('click', () => selectConversation(conversation.id));
    return div;
}

// Selecionar conversa
function selectConversation(conversationId) {
    const conversation = conversations.find(c => c.id === conversationId);
    if (!conversation) return;
    
    currentConversation = conversation;
    
    // Atualizar UI
    updateChatHeader(conversation);
    renderMessages(conversation.messages);
    
    // Marcar como ativa
    document.querySelectorAll('.conversation-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-conversation-id="${conversationId}"]`).classList.add('active');
    
    // Limpar mensagens não lidas
    conversation.unread = 0;
    renderConversations();
    
    // Focar no input
    messageInput.focus();
}

// Atualizar header do chat
function updateChatHeader(conversation) {
    contactName.textContent = conversation.name;
    contactStatus.textContent = conversation.status === 'online' ? 'online' : 'offline';
    contactPic.src = conversation.avatar;
    
    // Atualizar status visual
    const statusIndicator = document.querySelector('.status-indicator') || 
        document.createElement('div');
    statusIndicator.className = `status-indicator status-${conversation.status}`;
    
    if (!document.querySelector('.status-indicator')) {
        document.querySelector('.contact-info').appendChild(statusIndicator);
    }
}

// Renderizar mensagens
function renderMessages(messages) {
    messagesContainer.innerHTML = '';
    
    if (messages.length === 0) {
        messagesContainer.innerHTML = `
            <div class="welcome-message">
                <div class="welcome-icon">
                    <i class="fab fa-whatsapp"></i>
                </div>
                <h2>WhatsApp Web</h2>
                <p>Envie e receba mensagens sem precisar conectar seu telefone.</p>
                <p>Use o WhatsApp em até 4 dispositivos conectados e 1 telefone ao mesmo tempo.</p>
            </div>
        `;
        return;
    }
    
    messages.forEach(message => {
        const messageElement = createMessageElement(message);
        messagesContainer.appendChild(messageElement);
    });
    
    // Scroll para a última mensagem
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Criar elemento de mensagem
function createMessageElement(message) {
    const div = document.createElement('div');
    div.className = `message ${message.type}`;
    
    div.innerHTML = `
        <div class="message-content">
            <div class="message-text">${message.text}</div>
            <div class="message-time">${message.time}</div>
        </div>
    `;
    
    return div;
}

// Enviar mensagem
function sendMessage() {
    const text = messageInput.value.trim();
    if (!text || !currentConversation) return;
    
    const now = new Date();
    const time = now.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    const newMessage = {
        id: Date.now(),
        text: text,
        time: time,
        type: 'sent'
    };
    
    // Adicionar mensagem à conversa atual
    currentConversation.messages.push(newMessage);
    currentConversation.lastMessage = text;
    currentConversation.time = time;
    
    // Renderizar mensagem
    const messageElement = createMessageElement(newMessage);
    messagesContainer.appendChild(messageElement);
    
    // Limpar input
    messageInput.value = '';
    messageInput.style.height = 'auto';
    
    // Scroll para a nova mensagem
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Simular resposta automática
    setTimeout(() => {
        simulateReply();
    }, 1000 + Math.random() * 2000);
    
    // Atualizar lista de conversas
    renderConversations();
}

// Simular resposta automática
function simulateReply() {
    if (!currentConversation) return;
    
    const replies = [
        "Entendi! 👍",
        "Beleza!",
        "Valeu!",
        "Perfeito! 😊",
        "Concordo!",
        "Legal!",
        "Show!",
        "Tudo bem!",
        "Ok!",
        "Certo! 👍"
    ];
    
    const randomReply = replies[Math.floor(Math.random() * replies.length)];
    const now = new Date();
    const time = now.toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    const replyMessage = {
        id: Date.now(),
        text: randomReply,
        time: time,
        type: 'received'
    };
    
    // Adicionar resposta à conversa
    currentConversation.messages.push(replyMessage);
    currentConversation.lastMessage = randomReply;
    currentConversation.time = time;
    
    // Renderizar resposta
    const messageElement = createMessageElement(replyMessage);
    messagesContainer.appendChild(messageElement);
    
    // Scroll para a resposta
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Atualizar lista de conversas
    renderConversations();
}

// Filtrar conversas
function filterConversations(searchTerm) {
    const filteredConversations = conversations.filter(conversation =>
        conversation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conversation.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    conversationsList.innerHTML = '';
    filteredConversations.forEach(conversation => {
        const conversationElement = createConversationElement(conversation);
        conversationsList.appendChild(conversationElement);
    });
}

// Função para adicionar nova conversa
function addNewConversation(name, avatar) {
    const newConversation = {
        id: Date.now(),
        name: name,
        avatar: avatar || `https://via.placeholder.com/49x49/${Math.floor(Math.random()*16777215).toString(16)}/ffffff?text=${name.charAt(0)}`,
        lastMessage: "Nova conversa iniciada",
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        unread: 0,
        status: "online",
        messages: []
    };
    
    conversations.unshift(newConversation);
    renderConversations();
    return newConversation;
}

// Função para mostrar indicador de digitação
function showTypingIndicator() {
    if (!currentConversation) return;
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.innerHTML = `
        <span>${currentConversation.name} está digitando</span>
        <div class="typing-dots">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    return typingDiv;
}

// Função para esconder indicador de digitação
function hideTypingIndicator(typingElement) {
    if (typingElement && typingElement.parentNode) {
        typingElement.parentNode.removeChild(typingElement);
    }
}

// Event listeners para botões
document.addEventListener('click', function(e) {
    // Botão de emoji
    if (e.target.closest('.icon-btn') && e.target.closest('.icon-btn').querySelector('.fa-smile')) {
        // Simular abertura de emoji picker
        alert('Emoji picker seria aberto aqui!');
    }
    
    // Botão de anexo
    if (e.target.closest('.icon-btn') && e.target.closest('.icon-btn').querySelector('.fa-paperclip')) {
        // Simular abertura de menu de anexos
        alert('Menu de anexos seria aberto aqui!');
    }
    
    // Botão de microfone
    if (e.target.closest('.icon-btn') && e.target.closest('.icon-btn').querySelector('.fa-microphone')) {
        // Simular gravação de áudio
        alert('Gravação de áudio seria iniciada aqui!');
    }
});

// Simular notificações
function simulateNotification() {
    if (Notification.permission === 'granted') {
        new Notification('WhatsApp Web', {
            body: 'Nova mensagem recebida',
            icon: 'https://via.placeholder.com/64x64/25D366/ffffff?text=W'
        });
    }
}

// Solicitar permissão para notificações
if ('Notification' in window) {
    Notification.requestPermission();
}

// Simular mensagens automáticas periódicas
setInterval(() => {
    if (currentConversation && Math.random() < 0.1) { // 10% de chance
        simulateReply();
    }
}, 30000); // A cada 30 segundos

// Função para exportar conversas (simulação)
function exportConversations() {
    const dataStr = JSON.stringify(conversations, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'whatsapp-conversations.json';
    link.click();
    URL.revokeObjectURL(url);
}

// Função para importar conversas (simulação)
function importConversations(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedConversations = JSON.parse(e.target.result);
            conversations.length = 0;
            conversations.push(...importedConversations);
            renderConversations();
            alert('Conversas importadas com sucesso!');
        } catch (error) {
            alert('Erro ao importar conversas: ' + error.message);
        }
    };
    reader.readAsText(file);
}

// Adicionar algumas conversas de exemplo ao carregar
window.addEventListener('load', function() {
    // Adicionar conversas extras se não existirem
    if (conversations.length < 5) {
        addNewConversation("Grupo Família", "https://via.placeholder.com/49x49/25D366/ffffff?text=F");
        addNewConversation("Trabalho", "https://via.placeholder.com/49x49/128C7E/ffffff?text=T");
    }
});