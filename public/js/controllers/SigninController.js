import SigninView from '../views/signin/SigninView.js';
import SigninModel from '../models/SigninModel.js';
import EventBus from '../lib/eventbus/eventbus.js';

const eventList = [
    'signin',
    'signinResponse',
    'signinSuccess',
    'loadWaiting'
];

export default class SigninController {
    constructor ({ router, globalEventBus } = {}) {
        const eventBus = new EventBus(eventList);

        eventBus.subscribeToEvent('signinSuccess', (data) => {
            router.toStartPage();
            globalEventBus.triggerEvent('renderHeaderBar', data);
        });

        this.signinView = new SigninView({ eventBus });
        this.signinModel = new SigninModel(eventBus);
    }
}
