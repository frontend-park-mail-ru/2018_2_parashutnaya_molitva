import SingleplayerView from '../views/singleplayer/SingleplayerView';

export default class SingleplayerController {
    constructor ({ globalEventBus = {} } = {}) {
        this.singleplayerView = new SingleplayerView({ eventBus: globalEventBus });
    }
}
