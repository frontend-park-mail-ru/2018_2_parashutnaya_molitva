import template from './chat.tmpl.xml';
import View from '../../lib/view';
import ChatMessage from '../../components/chatMessage/chatMessage';

export default class ChatView extends View {
    constructor ({ eventBus = {} } = {}) {
        super(template, eventBus);
        this._eventBus.subscribeToEvent('messageReceived', this._messageReceived.bind(this));

        this._messages = [];
    }

    render (root) {
        super.render(root);
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
    }
}
