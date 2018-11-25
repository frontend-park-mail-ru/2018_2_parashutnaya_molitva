export default class ChatModel {
    constructor ({ eventBus = {} } = {}) {
        this._eventBus = eventBus;
        // demo crutch
        this._eventBus.subscribeToEvent('sendMessage', this._onSendMessage.bind(this));
    }

    _onSendMessage (message) {
        this._eventBus.triggerEvent('messageReceived', message);
    }
}
