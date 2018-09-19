import {ScoreboardView} from "../views/scoreboard/ScoreboardView";
import ScoreboardModel from '../models/ScoreboardModel';
import EventBus from "../lib/eventbus";

const eventList = [
    'load',
    'loadResponse',
    'loadWaiting',
];

export default class ScoreboardController {
    constructor() {
        this._eventBus = new EventBus(eventList);

        this.scoreboardView = new ScoreboardView(this._eventBus);
        this.scoreboardModel = new ScoreboardModel(this._eventBus);

    }
}
