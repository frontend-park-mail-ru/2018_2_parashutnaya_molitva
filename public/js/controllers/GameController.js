import MultiplayerView from '../views/multiplayer/MultiplayerView';
import SingleplayerView from '../views/singleplayer/SingleplayerView';
import GameOnlineModel from '../models/game/GameOnlineModel';
import { GAME, ROUTER, SERVICE as WS, SERVICE, VIEW } from '../lib/eventbus/events';
import GameOfflineModel from '../models/game/GameOfflineModel';
import GameAIModel from '../models/game/GameAIModel';
import EventBus from '../lib/eventbus/eventbus';
import { GAME_MODE } from '../models/game/mode';

const offlineEvents = [
    GAME.MOVE,
    GAME.MODE_CHOOSE,
    GAME.MOVE_SUCCESS,
    GAME.MOVE_FAILURE,
    GAME.START_GAME,
    GAME.GAMEOVER,
    GAME.INIT_GAME,
    GAME.INIT_GAME_RESPONSE,
    GAME.PROMOTION,
    GAME.PROMOTION_RESPONSE,
    ROUTER.BACK_TO_MENU,
    VIEW.CLOSE
];

const onlineEvents = [
    ...offlineEvents,
    GAME.FIND_ROOM,
    SERVICE.ON_ERR,
    SERVICE.ON_CLOSE,
    ROUTER.TO_SIGNIN,
    SERVICE.CHECK_AUTH_RESPONSE,
    SERVICE.CHECK_AUTH,
    GAME.SURRENDER,
    SERVICE.ON_CLOSE,
    ROUTER.TO_OFFLINE
];

export default class GameController {
    constructor ({ router = {}, globalEventBus = {} } = {}) {
        const eventBusOffline = new EventBus(offlineEvents);
        const eventBusOnline = new EventBus(onlineEvents);
        const eventBusAi = new EventBus(offlineEvents);

        eventBusOffline.subscribeToEvent(ROUTER.BACK_TO_MENU, () => {
            router.toStartPage();
        });

        eventBusAi.subscribeToEvent(ROUTER.BACK_TO_MENU, () => {
            router.toStartPage();
        });

        eventBusOnline.subscribeToEvent(ROUTER.BACK_TO_MENU, () => {
            router.toStartPage();
        });

        eventBusOnline.subscribeToEvent(ROUTER.TO_SIGNIN, () => {
            router.change('/signin');
        });

        eventBusOnline.subscribeToEvent(ROUTER.TO_OFFLINE, ({ duration }) => {
            router.change('/singleplayer', true, { duration, mode: GAME_MODE.OFFLINE });
        });

        this.multiplayerView = new MultiplayerView({ eventBus: eventBusOnline });
        this.singleplayerView = new SingleplayerView({ eventBus: eventBusOffline, eventBusAi: eventBusAi });

        this._gameOnlineModel = new GameOnlineModel({ eventBus: eventBusOnline, globalEventBus });
        this._gameOfflineModel = new GameOfflineModel({ eventBus: eventBusOffline });
        this._gameAiModel = new GameAIModel({ eventBus: eventBusAi });
    }
}
