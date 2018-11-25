import EventBus from '../lib/eventbus/eventbus';
import ChatView from '../views/chat/ChatView';
import ChatModel from '../models/ChatModel';

const eventList = [
    'sendMessage',
    'messageReceived'
];

export default class ChatController {
    constructor ({globalEventBus}) {
        const eventBus = new EventBus(eventList);
        this.chatModel = new ChatModel({ eventBus });
        this.chatView = new ChatView({ eventBus, globalEventBus });
    }
}
