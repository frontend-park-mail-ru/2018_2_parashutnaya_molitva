import './chat.less';
import template from './chat.tmpl.xml';
import View from '../../lib/view';
import ChatMessage from '../../components/chatMessage/chatMessage';
import {CHAT, GLOBAL, HEADER} from "../../lib/eventbus/events";

export default class ChatView extends View {
    constructor ({ eventBus = {}, globalEventBus = {} } = {}) {
        super(template, eventBus);
        this._globalEventBus = globalEventBus;
        this._messages = [];
    }

    render (root) {
        super.render(root);
        this._globalEventBus.triggerEvent(HEADER.CLOSE);
        this._globalEventBus.triggerEvent(CHAT.CLOSE);
        this._globalEventBus.triggerEvent(GLOBAL.CLEAR_STYLES);

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

    }
}
