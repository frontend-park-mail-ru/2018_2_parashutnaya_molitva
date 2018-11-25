import EventBus from '../lib/eventbus/eventbus';
import ChatView from '../views/chat/ChatView';

export default class ChatController {
    constructor ({router, globalEventBus = {}}) {
        const eventBus = new EventBus([]);
        this.chatView = new ChatView({ eventBus, globalEventBus });
    }
}
