import MultiplayerView from "../views/multiplayer/MultiplayerView";
import SingleplayerView from "../views/singleplayer/SingleplayerView";
import GameOnlineModel from "../models/game/GameOnlineModel";
import {GAME, ROUTER, SERVICE} from "../lib/eventbus/events";
import GameOfflineModel from "../models/game/GameOfflineModel";
import EventBus from "../lib/eventbus/eventbus";

const offlineEvents = [
    GAME.MOVE,
    GAME.MOVE_SUCCESS,
    GAME.MOVE_FAILURE,
    GAME.START_GAME,
    GAME.GAMEOVER,
    ROUTER.BACK_TO_MENU,
];

const onlineEvents = [
    ...offlineEvents,
    GAME.FIND_ROOM,
    GAME.INIT_GAME,
    GAME.INIT_GAME_RESPONSE,
    SERVICE.ON_ERR,
    SERVICE.ON_CLOSE,
    ROUTER.TO_SIGNIN,
    SERVICE.CHECK_AUTH_RESPONSE,
    SERVICE.CHECK_AUTH,
    GAME.SURRENDER,

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

        eventBusOnline.subscribeToEvent(ROUTER.TO_SIGNIN, () => {
            router.change('/signin');
        });

        this.multiplayerView = new MultiplayerView({eventBus: eventBusOnline});
        this.singleplayerView = new SingleplayerView({eventBus: eventBusOffline});

        this._gameOnlineModel = new GameOnlineModel({eventBus: eventBusOnline});
        this._gameOfflineModel = new GameOfflineModel({eventBus: eventBusOffline});
    }

}