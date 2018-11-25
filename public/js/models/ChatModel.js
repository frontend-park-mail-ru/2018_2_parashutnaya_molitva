export default class ChatModel {
    constructor ({ eventBus = {} } = {}) {
        this._eventBus = eventBus;

        // demo crutch
        this._eventBus.subscribeToEvent('sendMessage', this._messageReceived.bind(this));
    }

    _messageReceived (message) {
        this._eventBus.triggerEvent('messageReceived', message);
    }
}
