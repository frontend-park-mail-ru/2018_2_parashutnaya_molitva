import HeaderBarView from '../views/headerBar/HeaderBarView.js';
import HeaderBarModel from '../models/HeaderBarModel.js';
import EventBus from '../lib/eventbus.js';

const eventList = [
    'checkAuthResponse',
    'checkAuth',
    'signout',
    'signoutResponse',
    'loadAvatarResponse',
    'loadAvatar',
];

export default class HeaderBarController {
    constructor ({ globalEventBus = {} } = {}) {
        this._eventBus = new EventBus(eventList);
        this.headerBarView = new HeaderBarView(this._eventBus, globalEventBus);
        this.headerBarModel = new HeaderBarModel(this._eventBus, globalEventBus);
    }
}
