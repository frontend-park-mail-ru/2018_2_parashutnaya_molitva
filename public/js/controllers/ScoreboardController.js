import {ScoreboardView} from "../views/scoreboard/ScoreboardView";
import ScoreboardModel from '../models/ScoreboardModel';

export default class ScoreboardController {
    constructor() {
        this.scoreboardView = new ScoreboardView();
        this.scoreboardModel = new ScoreboardModel();
    }
}
