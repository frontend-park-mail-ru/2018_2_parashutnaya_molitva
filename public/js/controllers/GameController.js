import MultiplayerView from "../views/multiplayer/MultiplayerView";
import SingleplayerView from "../views/singleplayer/SingleplayerView";
import GameOnlineModel from "../models/game/GameOnlineModel";
import {GAME, ROUTER} from "../lib/eventbus/events";
import GameOfflineModel from "../models/game/GameOfflineModel";
import EventBus from "../lib/eventbus/eventbus";

const offlineEvents = [
    GAME.MOVE,
    GAME.MOVE_SUCCESS,
    GAME.MOVE_FAILURE,
    GAME.GAMEOVER,
    ROUTER.BACK_TO_MENU,
];

const onlineEvents = [
    ...offlineEvents,
];

export default class GameController {
    constructor({router = {}} = {}) {
        const eventBusOffline = new EventBus(offlineEvents);
        const eventBusOnline = new EventBus(onlineEvents);

        eventBusOffline.subscribeToEvent(ROUTER.BACK_TO_MENU, () => {
            router.toStartPage();
        });

        eventBusOnline.subscribeToEvent(ROUTER.BACK_TO_MENU, () => {
            router.toStartPage();
        });

        this.multiplayerView = new MultiplayerView({eventBus: eventBusOnline});
        this.singleplayerView = new SingleplayerView({eventBus: eventBusOffline});

       // this._gameOnlineModel = new GameOnlineModel({eventBus: eventBusOnline});
        this._gameOfflineModel = new GameOfflineModel({eventBus: eventBusOffline});
    }

}