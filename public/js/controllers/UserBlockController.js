import UserBlockView from "../views/userblock/UserBlockView";
import UserBlockModel from "../models/UserBlockModel"
import EventBus from "../lib/eventbus";

const eventList = [
    'checkAuthResponse',
    'checkAuth',
    'signout',
    'signoutResponse',
];

export default class UserBlockController {
    constructor() {
        this._eventBus = new EventBus(eventList);
        this.userBlockView = new UserBlockView(this._eventBus);
        this.userBlockModel = new UserBlockModel(this._eventBus);
    }
}