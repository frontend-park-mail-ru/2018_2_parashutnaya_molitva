import GameOnlineModel from "../models/game/GameOnlineModel";
import GameOnlineView from "../views/gameOnline/GameOnlineView";

export default class GameOnlineController {
    constructor({eventBus = {}}) {
        this.gameOnlineModel = new GameOnlineModel({eventBus});
        this.gameOnlineView = new GameOnlineView({eventBus});
    }


}