import HeaderBarView from '../views/headerBar/HeaderBarView.js';
import HeaderBarModel from '../models/HeaderBarModel.js';
import EventBus from '../lib/eventbus/eventbus.js';
import {ROUTER, SERVICE} from "../lib/eventbus/events";

const eventList = [
    SERVICE.CHECK_AUTH,
    SERVICE.CHECK_AUTH_RESPONSE,
    SERVICE.LOAD_USER,
    SERVICE.LOAD_USER_RESPONSE,
    SERVICE.SIGNOUT,
    SERVICE.SIGNOUT_RESPONSE,
    ROUTER.BACK_TO_MENU,
];

export default class HeaderBarController {
    constructor ({ globalEventBus = {}, router = {} } = {}) {
        this._eventBus = new EventBus(eventList);
        this.headerBarView = new HeaderBarView(this._eventBus, globalEventBus);
        this.headerBarModel = new HeaderBarModel(this._eventBus, globalEventBus);

        this._eventBus.subscribeToEvent(ROUTER.BACK_TO_MENU, () =>{
           router.toStartPage();
        });
    }
}
