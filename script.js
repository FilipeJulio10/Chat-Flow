// Dados dos contatos
const contacts = {
    'João Silva': {
        name: 'João Silva',
        avatar: 'https://via.placeholder.com/49x49/128C7E/ffffff?text=JS',
        status: 'online',
        messages: [
            { text: 'Oi! Como você está?', time: '14:30', type: 'received' },
            { text: 'Oi João! Tudo bem sim, e você?', time: '14:32', type: 'sent' },
            { text: 'Tudo ótimo! Queria saber se você tem tempo para conversarmos sobre aquele projeto?', time: '14:33', type: 'received' },
            { text: 'Claro! Tenho tempo sim. Que projeto você tem em mente?', time: '14:35', type: 'sent' },
            { text: 'É sobre um site que preciso desenvolver. Posso te explicar melhor?', time: '14:36', type: 'received' }
        ]
    },
    'Maria Santos': {
        name: 'Maria Santos',
        avatar: 'https://via.placeholder.com/49x49/075E54/ffffff?text=MS',
        status: 'offline',
        messages: [
            { text: 'Oi! Tudo bem?', time: '13:45', type: 'received' },
            { text: 'Oi Maria! Tudo bem sim, e você?', time: '13:47', type: 'sent' },
            { text: 'Vamos marcar algo para hoje?', time: '13:50', type: 'received' }
        ]
    },
    'Pedro Costa': {
        name: 'Pedro Costa',
        avatar: 'https://via.placeholder.com/49x49/128C7E/ffffff?text=PC',
        status: 'online',
        messages: [
            { text: 'Enviou uma foto', time: '12:20', type: 'received' },
            { text: 'Que foto legal!', time: '12:25', type: 'sent' }
        ]
    },
    'Ana Oliveira': {
        name: 'Ana Oliveira',
        avatar: 'https://via.placeholder.com/49x49/075E54/ffffff?text=AO',
        status: 'offline',
        messages: [
            { text: 'Obrigada pela ajuda!', time: 'Ontem', type: 'received' },
            { text: 'Por nada! Fico feliz em ajudar!', time: 'Ontem', type: 'sent' }
        ]
    },
    'Carlos Lima': {
        name: 'Carlos Lima',
        avatar: 'https://via.placeholder.com/49x49/128C7E/ffffff?text=CL',
        status: 'offline',
        messages: [
            { text: 'Enviou um documento', time: 'Ontem', type: 'received' },
            { text: 'Recebi! Vou analisar e te respondo em breve.', time: 'Ontem', type: 'sent' }
        ]
    }
};

let currentContact = 'João Silva';
let currentMessages = [...contacts[currentContact].messages];

// Elementos DOM
const contactsList = document.querySelector('.contacts-list');
const messagesContainer = document.querySelector('.messages-container');
const messageInput = document.querySelector('.message-input');
const searchInput = document.querySelector('.search-input');
const chatHeader = document.querySelector('.chat-header');
const contactName = document.querySelector('.chat-header .contact-name');
const contactStatus = document.querySelector('.chat-header .contact-status');
const contactAvatar = document.querySelector('.chat-header .contact-avatar img');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    updateChatHeader();
    renderMessages();
});

// Configurar event listeners
function setupEventListeners() {
    // Troca de contatos
    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('click', function() {
            const contactName = this.getAttribute('data-contact');
            switchContact(contactName);
        });
    });

    // Envio de mensagens
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Pesquisa de contatos
    searchInput.addEventListener('input', function() {
        filterContacts(this.value);
    });

    // Auto-resize do input
    messageInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 100) + 'px';
    });

    // Botões de ação
    document.querySelector('.emoji-btn').addEventListener('click', showEmojiPicker);
    document.querySelector('.attach-btn').addEventListener('click', showAttachmentMenu);
    document.querySelector('.voice-btn').addEventListener('click', startVoiceMessage);
}

// Trocar contato ativo
function switchContact(contactName) {
    // Remover classe active do contato anterior
    document.querySelector('.contact-item.active').classList.remove('active');
    
    // Adicionar classe active ao novo contato
    document.querySelector(`[data-contact="${contactName}"]`).classList.add('active');
    
    // Atualizar dados
    currentContact = contactName;
    currentMessages = [...contacts[contactName].messages];
    
    // Atualizar interface
    updateChatHeader();
    renderMessages();
    
    // Limpar input
    messageInput.value = '';
    messageInput.style.height = 'auto';
}

// Atualizar header do chat
function updateChatHeader() {
    const contact = contacts[currentContact];
    contactName.textContent = contact.name;
    contactStatus.textContent = contact.status;
    contactAvatar.src = contact.avatar;
    
    // Atualizar status online/offline
    const onlineStatus = document.querySelector('.chat-header .online-status');
    if (contact.status === 'online') {
        if (!onlineStatus) {
            const status = document.createElement('div');
            status.className = 'online-status';
            document.querySelector('.chat-header .contact-avatar').appendChild(status);
        }
    } else {
        if (onlineStatus) {
            onlineStatus.remove();
        }
    }
}

// Renderizar mensagens
function renderMessages() {
    messagesContainer.innerHTML = '';
    
    // Adicionar data
    const dateDiv = document.createElement('div');
    dateDiv.className = 'message-date';
    dateDiv.innerHTML = '<span>Hoje</span>';
    messagesContainer.appendChild(dateDiv);
    
    // Renderizar mensagens
    currentMessages.forEach(message => {
        const messageDiv = createMessageElement(message);
        messagesContainer.appendChild(messageDiv);
    });
    
    // Scroll para baixo
    scrollToBottom();
}

// Criar elemento de mensagem
function createMessageElement(message) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${message.type}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    const textDiv = document.createElement('div');
    textDiv.className = 'message-text';
    textDiv.textContent = message.text;
    
    const timeDiv = document.createElement('div');
    timeDiv.className = 'message-time';
    timeDiv.textContent = message.time;
    
    contentDiv.appendChild(textDiv);
    contentDiv.appendChild(timeDiv);
    
    // Adicionar status para mensagens enviadas
    if (message.type === 'sent') {
        const statusDiv = document.createElement('div');
        statusDiv.className = 'message-status';
        statusDiv.innerHTML = '<i class="fas fa-check-double"></i>';
        timeDiv.appendChild(statusDiv);
    }
    
    messageDiv.appendChild(contentDiv);
    return messageDiv;
}

// Enviar mensagem
function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;
    
    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ':' + 
                 now.getMinutes().toString().padStart(2, '0');
    
    const newMessage = {
        text: text,
        time: time,
        type: 'sent'
    };
    
    // Adicionar à lista de mensagens
    currentMessages.push(newMessage);
    contacts[currentContact].messages.push(newMessage);
    
    // Renderizar nova mensagem
    const messageDiv = createMessageElement(newMessage);
    messagesContainer.appendChild(messageDiv);
    
    // Limpar input
    messageInput.value = '';
    messageInput.style.height = 'auto';
    
    // Scroll para baixo
    scrollToBottom();
    
    // Simular resposta automática após 2 segundos
    setTimeout(() => {
        simulateResponse();
    }, 2000);
}

// Simular resposta automática
function simulateResponse() {
    const responses = [
        'Entendi!',
        'Interessante...',
        'Vou pensar sobre isso.',
        'Concordo com você!',
        'Hmm, me conta mais sobre isso.',
        'Legal!',
        'Obrigado por compartilhar!',
        'Vou verificar e te respondo.',
        'Perfeito!',
        'Que bom!'
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    const now = new Date();
    const time = now.getHours().toString().padStart(2, '0') + ':' + 
                 now.getMinutes().toString().padStart(2, '0');
    
    const responseMessage = {
        text: randomResponse,
        time: time,
        type: 'received'
    };
    
    // Adicionar à lista de mensagens
    currentMessages.push(responseMessage);
    contacts[currentContact].messages.push(responseMessage);
    
    // Renderizar resposta
    const messageDiv = createMessageElement(responseMessage);
    messagesContainer.appendChild(messageDiv);
    
    // Scroll para baixo
    scrollToBottom();
    
    // Atualizar última mensagem na lista de contatos
    updateLastMessage(randomResponse, time);
}

// Atualizar última mensagem na lista de contatos
function updateLastMessage(text, time) {
    const contactItem = document.querySelector(`[data-contact="${currentContact}"]`);
    const lastMessageEl = contactItem.querySelector('.last-message');
    const timeEl = contactItem.querySelector('.message-time');
    
    lastMessageEl.textContent = text;
    timeEl.textContent = time;
    
    // Mover contato para o topo
    const contactsList = document.querySelector('.contacts-list');
    contactsList.insertBefore(contactItem, contactsList.firstChild);
}

// Filtrar contatos
function filterContacts(searchTerm) {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        const name = item.getAttribute('data-contact').toLowerCase();
        const lastMessage = item.querySelector('.last-message').textContent.toLowerCase();
        
        if (name.includes(searchTerm.toLowerCase()) || lastMessage.includes(searchTerm.toLowerCase())) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Scroll para baixo
function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Mostrar seletor de emojis (simulado)
function showEmojiPicker() {
    const emojis = ['😊', '😂', '❤️', '👍', '🎉', '🔥', '😎', '🤔', '👏', '🙏'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    messageInput.value += emoji;
    messageInput.focus();
}

// Mostrar menu de anexos (simulado)
function showAttachmentMenu() {
    alert('Menu de anexos:\n📷 Foto\n📁 Documento\n📍 Localização\n👤 Contato');
}

// Iniciar mensagem de voz (simulado)
function startVoiceMessage() {
    alert('🎤 Gravação de voz iniciada...\nClique novamente para parar.');
}

// Responsividade para mobile
function setupMobileResponsiveness() {
    if (window.innerWidth <= 768) {
        // Implementar navegação mobile se necessário
        console.log('Mobile view detected');
    }
}

// Event listener para redimensionamento
window.addEventListener('resize', setupMobileResponsiveness);

// Inicializar responsividade
setupMobileResponsiveness();