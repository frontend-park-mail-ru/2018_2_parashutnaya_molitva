import { ScoreboardView } from '../views/scoreboard/ScoreboardView';
import ScoreboardModel from '../models/ScoreboardModel';
import EventBus from '../lib/eventbus';

const eventList = [
    'load',
    'loadResponse',
    'loadWaiting',
    'loadPaginator',
    'loadPaginatorResponse'
];

export default class ScoreboardController {
    constructor ({ globalEventBus = {} } = {}) {
        const eventBus = new EventBus(eventList);
        this.scoreboardView = new ScoreboardView({ eventBus, globalEventBus });
        this.scoreboardModel = new ScoreboardModel(eventBus);
    }
}
