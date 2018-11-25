import EventBus from '../lib/eventbus/eventbus';
import ChatView from '../views/chat/ChatView';
import ChatModel from '../models/ChatModel';
import {VIEW} from "../lib/eventbus/events";

const eventList = [
    'sendMessage',
    'messageReceived',
    VIEW.RENDER,
];

export default class ChatController {
    constructor ({globalEventBus}) {
        const eventBus = new EventBus(eventList);
        this.chatView = new ChatView({ eventBus, globalEventBus });
        this.chatModel = new ChatModel({ eventBus });
    }
}
