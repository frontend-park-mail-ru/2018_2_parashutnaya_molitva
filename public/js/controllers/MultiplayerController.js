import MultiplayerView from '../views/multiplayer/MultiplayerView.js';
import MultiplayerModel from '../models/MultiplayerModel.js';
import EventBus from '../lib/eventbus.js';
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
    constructor ({ globalEventBus = {}, root = {} } = {}) {
        this._root = root;
        const eventBus = new EventBus(events);
        eventBus.subscribeToEvent('startGame', this._startGame.bind(this));

        this._gameOnlineController = new GameOnlineController({eventBus});
        this.multiplayerView = new MultiplayerView({ eventBus, globalEventBus });
        this.multiplayerModel = new MultiplayerModel(eventBus, this._gameOnlineController.gameOnlineModel);

        this._eventBus = eventBus

    }

    _startGame(data){
        this._gameOnlineController.gameOnlineView.render(this._root, data)
    }

}
