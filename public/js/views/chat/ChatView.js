import './chat.less';
import template from './chat.tmpl.xml';
import View from '../../lib/view';
import ChatMessage from '../../components/chatMessage/chatMessage';
import {CHAT, GLOBAL, HEADER} from "../../lib/eventbus/events";

export default class ChatView extends View {
    constructor ({ eventBus = {}, globalEventBus = {} } = {}) {
        super(template, eventBus);
        this._globalEventBus = globalEventBus;
        this._eventBus.subscribeToEvent('messageReceived', this._messageReceived.bind(this));
        this._globalEventBus = globalEventBus;
        this._messages = ['hi', 'hey', 'yo'];
        this._openedChats = ['all', 'player_0', 'player_1'];
        this._currentChat = 'all';
    }

    render (root) {
        super.render(root);
        this._globalEventBus.triggerEvent(HEADER.CLOSE);
        this._globalEventBus.triggerEvent(CHAT.CLOSE);
        this._globalEventBus.triggerEvent(GLOBAL.CLEAR_STYLES);

        const messages = document.querySelector('.js-messages');

        this._messages.forEach(message => {
            const textMessage = new ChatMessage({message});
            textMessage.appendToChat(messages);
        });

        window.scrollTo(0,document.body.scrollHeight);

        const sendButton = document.querySelector('.js-send-button');
        sendButton.addEventListener('click', this._onSendClick.bind(this));

        const headerButtons = document.querySelectorAll('.chat__header__tab__button');
        headerButtons.forEach(button => {
            button.addEventListener('click',this._onHeaderTabClick.bind(this, button.textContent));
        });
    }

    _messageReceived(message) {
        const chat = document.querySelector('.js-messages');
        const newMessage = new ChatMessage({ message });
        newMessage.appendToChat(chat);
        window.scrollTo(0,document.body.scrollHeight);
    }

    _onSendClick () {
        const textField = document.querySelector('.js-send-form');
        this._eventBus.triggerEvent('sendMessage', textField.value);
        textField.value = '';
        window.scrollTo(0,document.body.scrollHeight);
    }

    _onHeaderTabClick(chatName) {
        // get messages from player `chatName`
        // demo crutch!!!!!!!!
        const messages = document.querySelector('.js-messages');
        messages.innerHTML = '';
        if (chatName === 'player_0') {
            this._messages = ['message1 from player_0', 'message2 from player_0'];
        } else if (chatName === 'player_1') {
            this._messages = ['message1 from player_1', 'message2 from player_1'];
        } else {
            this._messages = ['hi', 'hey', 'yo'];
        }
        this._messages.forEach(message => {
            const newMessage = new ChatMessage({ message });
            newMessage.appendToChat(messages);
        });
        window.scrollTo(0,document.body.scrollHeight);
    }
}
