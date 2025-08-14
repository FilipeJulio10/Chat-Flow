# WhatsApp Web Clone

Um clone completo do WhatsApp Web desenvolvido com HTML, CSS e JavaScript puro. Este projeto replica a interface e funcionalidades principais do WhatsApp Web.

## 🚀 Funcionalidades

### ✅ Interface
- **Design fiel ao WhatsApp**: Interface idêntica ao WhatsApp Web original
- **Layout responsivo**: Funciona em desktop e dispositivos móveis
- **Tema escuro**: Cores e estilos autênticos do WhatsApp
- **Animações suaves**: Transições e efeitos visuais

### ✅ Conversas
- **Lista de conversas**: Sidebar com todas as conversas
- **Pesquisa de conversas**: Filtro por nome ou última mensagem
- **Indicadores de status**: Online/offline para cada contato
- **Contadores de mensagens**: Badges para mensagens não lidas
- **Horários**: Timestamps das últimas mensagens

### ✅ Chat
- **Mensagens bidirecionais**: Envio e recebimento de mensagens
- **Bubble de mensagens**: Estilo autêntico do WhatsApp
- **Timestamps**: Horário de cada mensagem
- **Auto-scroll**: Rolagem automática para novas mensagens
- **Indicador de digitação**: Simulação de "está digitando"

### ✅ Interatividade
- **Envio por Enter**: Pressione Enter para enviar mensagens
- **Auto-resize**: Input expande conforme o texto
- **Respostas automáticas**: Simulação de respostas dos contatos
- **Notificações**: Sistema de notificações do navegador
- **Botões funcionais**: Emoji, anexo e microfone

## 🛠️ Como Usar

### Instalação
1. Clone ou baixe os arquivos do projeto
2. Abra o arquivo `index.html` em qualquer navegador moderno
3. Pronto! O WhatsApp clone está funcionando

### Uso Básico
1. **Selecionar conversa**: Clique em qualquer conversa na sidebar
2. **Enviar mensagem**: Digite no campo de texto e pressione Enter
3. **Pesquisar**: Use a barra de pesquisa para filtrar conversas
4. **Navegar**: Use os botões da interface para explorar funcionalidades

### Funcionalidades Avançadas
- **Respostas automáticas**: O sistema simula respostas dos contatos
- **Mensagens periódicas**: Novas mensagens aparecem automaticamente
- **Status dinâmico**: Indicadores de online/offline
- **Persistência**: Dados são mantidos durante a sessão

## 📁 Estrutura do Projeto

```
whatsapp-clone/
├── index.html          # Página principal
├── styles.css          # Estilos CSS completos
├── script.js           # Funcionalidades JavaScript
└── README.md           # Este arquivo
```

## 🎨 Características Técnicas

### CSS
- **Flexbox**: Layout moderno e responsivo
- **CSS Grid**: Estrutura de componentes
- **Variáveis CSS**: Cores e estilos consistentes
- **Animações**: Transições suaves e efeitos visuais
- **Media Queries**: Design responsivo para mobile

### JavaScript
- **ES6+**: Sintaxe moderna do JavaScript
- **Event Listeners**: Interatividade completa
- **DOM Manipulation**: Renderização dinâmica
- **Local Storage**: Persistência de dados
- **Web APIs**: Notificações e outras funcionalidades

## 🔧 Personalização

### Cores
As cores podem ser alteradas editando as variáveis CSS no arquivo `styles.css`:

```css
:root {
    --whatsapp-green: #25d366;
    --chat-bg: #0b141a;
    --sidebar-bg: #202c33;
    --message-sent: #005c4b;
    --message-received: #202c33;
}
```

### Dados
Para adicionar novas conversas, edite o array `conversations` no arquivo `script.js`:

```javascript
const conversations = [
    {
        id: 1,
        name: "Nome do Contato",
        avatar: "URL_DA_IMAGEM",
        lastMessage: "Última mensagem",
        time: "HH:MM",
        unread: 0,
        status: "online",
        messages: []
    }
];
```

## 🌟 Funcionalidades Extras

### Simulações
- **Respostas automáticas**: Contatos respondem automaticamente
- **Mensagens periódicas**: Novas mensagens a cada 30 segundos
- **Indicador de digitação**: Simulação de "está digitando"
- **Status dinâmico**: Mudança de status online/offline

### Interatividade
- **Botões funcionais**: Todos os botões respondem ao clique
- **Pesquisa em tempo real**: Filtro instantâneo de conversas
- **Auto-focus**: Foco automático no campo de mensagem
- **Scroll automático**: Rolagem para novas mensagens

## 📱 Responsividade

O clone é totalmente responsivo e funciona em:
- **Desktop**: Interface completa com sidebar
- **Tablet**: Layout adaptado para telas médias
- **Mobile**: Interface otimizada para smartphones

## 🔒 Privacidade

- **Sem dados reais**: Todos os dados são simulados
- **Sem backend**: Funciona completamente no frontend
- **Sem tracking**: Não coleta informações do usuário
- **Local**: Dados ficam apenas no navegador

## 🚀 Melhorias Futuras

- [ ] Sistema de login
- [ ] Upload de arquivos
- [ ] Chamadas de voz/vídeo
- [ ] Grupos de conversa
- [ ] Temas personalizáveis
- [ ] Backup de conversas
- [ ] Modo offline
- [ ] PWA (Progressive Web App)

## 📄 Licença

Este projeto é apenas para fins educacionais e de demonstração. O WhatsApp é uma marca registrada da Meta Platforms, Inc.

## 🤝 Contribuição

Sinta-se à vontade para contribuir com melhorias, correções de bugs ou novas funcionalidades!

---

**Desenvolvido com ❤️ para demonstrar as capacidades do desenvolvimento web moderno**