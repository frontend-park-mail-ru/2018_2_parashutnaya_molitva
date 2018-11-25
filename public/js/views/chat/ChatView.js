import './chat.less';
import template from './chat.tmpl.xml';
import View from '../../lib/view';
import ChatMessage from '../../components/chatMessage/chatMessage';
import {CHAT, GLOBAL, HEADER} from "../../lib/eventbus/events";

export default class ChatView extends View {
    constructor ({ eventBus = {}, globalEventBus = {} } = {}) {
        super(template, eventBus);
        this._eventBus.subscribeToEvent('messageReceived', this._messageReceived.bind(this));
        this._globalEventBus = globalEventBus;
        this._messages = [];
    }

    render (root) {
        super.render(root);
        this._globalEventBus.triggerEvent(HEADER.CLOSE);
        this._globalEventBus.triggerEvent(CHAT.CLOSE);
        this._globalEventBus.triggerEvent(GLOBAL.CLEAR_STYLES);

<<<<<<< 369bb09853eb3e88f87a0040698b809abeb53000
        const chat = document.querySelector('.chat');
        const testMessage0 = new ChatMessage({
            message: 'hi'
        });
        testMessage0.appendToChat(chat);
        const testMessage1 = new ChatMessage({
            message: 'wasup'
        });
        testMessage1.appendToChat(chat);

        const sendButton = document.querySelector('.chat__send-button');
        sendButton.addEventListener('click', this._onSendClick.bind(this));
    }

    _messageReceived(message) {
        const chat = document.querySelector('.chat');
        const newMessage = new ChatMessage({ message });
        newMessage.appendToChat(chat);
    }

    _onSendClick () {
        const textField = document.querySelector('.chat__text-field');
        this._eventBus.triggerEvent('sendMessage', textField.value);
        textField.value = '';
=======
        const messages = document.querySelector('.js-messages');

        const testMessage0 = new ChatMessage({
            message: 'hi'
        });

        testMessage0.appendToChat(messages);

        const testMessage1 = new ChatMessage({
            message: 'wasup'
        });

        testMessage1.appendToChat(messages);

        window.scrollTo(0,document.body.scrollHeight);

>>>>>>> styles
    }
}
