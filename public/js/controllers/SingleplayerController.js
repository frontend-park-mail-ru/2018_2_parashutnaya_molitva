import SingleplayerView from '../views/singleplayer/SingleplayerView';
import EventBus from '../lib/eventbus';
import SingleplayerModel from '../models/SingleplayerModel';

const eventList = [
    'tryMove',
    'moveSuccess',
    'moveFailure',
    'gameOver'
];

export default class SingleplayerController {
    constructor () {
        const eventBus = new EventBus(eventList);
        this.singleplayerView = new SingleplayerView({ eventBus });
        this.singleplayerModel = new SingleplayerModel(eventBus);
    }
}
