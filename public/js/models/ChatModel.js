export default class ChatModel {
    constructor ({ eventBus = {} } = {}) {
        this._eventBus = eventBus;
    }
}
