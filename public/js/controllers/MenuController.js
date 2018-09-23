import MenuView from '../views/menu/MenuView.js';
import MenuModel from '../models/MenuModel.js';
import EventBus from "../lib/eventbus";

const eventList = [
    'checkAuthResponse',
    'checkAuth',
    'signout',
    'signoutResponse',
];

export default class MenuController {
    constructor() {
        this._eventBus = new EventBus(eventList);
        this.menuView = new MenuView(this._eventBus);
        this.menuModel = new MenuModel(this._eventBus);
    }

}

