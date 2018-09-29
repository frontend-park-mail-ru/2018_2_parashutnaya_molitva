import HeaderBarView from "../views/headerBar/HeaderBarView";
import HeaderBarModel from "../models/HeaderBarModel"
import EventBus from "../lib/eventbus";

const eventList = [
    'checkAuthResponse',
    'checkAuth',
    'signout',
    'signoutResponse',
];

export default class HeaderBarController {
    constructor({globalEventBus = {}} = {}) {
        this._eventBus = new EventBus(eventList);
        this.headerBarView = new HeaderBarView(this._eventBus, globalEventBus);
        this.headerBarModel = new HeaderBarModel(this._eventBus);
    }
}