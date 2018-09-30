import SigninView from '../views/signin/SigninView.js';
import SigninModel from '../models/SigninModel.js';
import EventBus from '../lib/eventbus.js';

const eventList = [
    'signin',
    'signinResponse',
    'signinSuccess'
];

export default class SigninController {
    constructor ({ router, globalEventBus } = {}) {
        const eventBus = new EventBus(eventList);
        eventBus.subscribeToEvent('signinSuccess', () => {
            router.toStartPage();
            globalEventBus.triggerEvent('renderHeaderBar');
        });
        this.signinView = new SigninView({ eventBus });
        this.signinModel = new SigninModel(eventBus);
    }
}
