import MultiplayerView from '../views/multiplayer/MultiplayerView.js';
import MultiplayerModel from '../models/MultiplayerModel.js';
import EventBus from '../lib/eventbus/eventbus.js';
import GameOnlineController from "./GameOnlineController";

const events = [
    'startGame',
    'startGameResponse',
    'findGame',
    'findGameResponse',
    'tryMove',
    'moveSuccess',
    'moveFailure',
    'gameOver',
    'onClose',
    'errorResp',
    'onClose'
];



export default class MultiplayerController {
    constructor ({ globalEventBus = {}, root = {}, router = {} } = {}) {
        this._root = root;
        const eventBus = new EventBus(events);

        this._gameOnlineController = new GameOnlineController({eventBus});
        this.multiplayerView = new MultiplayerView({ eventBus, globalEventBus });
        this.multiplayerModel = new MultiplayerModel(eventBus, this._gameOnlineController.gameOnlineModel);

        this._eventBus = eventBus

    }

}
