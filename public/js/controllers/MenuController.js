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
    constructor({globalEventBus = {}} = {}) {
        const eventBus = new EventBus(eventList);
        this.menuView = new MenuView({eventBus, globalEventBus});
        this.menuModel = new MenuModel(eventBus);
    }

}

