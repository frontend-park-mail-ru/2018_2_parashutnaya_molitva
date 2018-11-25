import EventBus from '../lib/eventbus/eventbus';
import ChatView from '../views/chat/ChatView';
import ChatModel from '../models/ChatModel';

const eventList = [
    'sendMessage',
    'messageReceived'
];

export default class ChatController {
    constructor () {
        const eventBus = new EventBus(eventList);
        this.chatView = new ChatView({ eventBus });
        this.chatModel = new ChatModel({ eventBus });
    }
}
