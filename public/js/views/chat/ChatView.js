import template from './chat.tmpl.xml';
import View from '../../lib/view';
import ChatMessage from '../../components/chatMessage/chatMessage';

export default class ChatView extends View {
    constructor ({ eventBus = {} } = {}) {
        super(template, eventBus);
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
    }
}
