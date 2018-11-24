import SignupView from '../views/signup/SignupView.js';
import SignupModel from '../models/SignupModel.js';
import EventBus from '../lib/eventbus/eventbus.js';

const eventList = [
    'signup',
    'signupResponse',
    'signupSuccess',
    'changeEmail',
    'changeEmailResponse',
    'changeLogin',
    'changeLoginResponse',
    'changePassword',
    'changePasswordResponse',
    'changePasswordRepeat',
    'changePasswordRepeatResponse',
    'loadWaiting'
];

export default class SignupController {
    constructor ({ router, globalEventBus } = {}) {
        const eventBus = new EventBus(eventList);
        eventBus.subscribeToEvent('signupSuccess', () => {
            router.toStartPage();
            globalEventBus.triggerEvent('renderHeaderBar');
        });
        this.signupView = new SignupView({ eventBus });
        this.signupModel = new SignupModel(eventBus);
    }
}
