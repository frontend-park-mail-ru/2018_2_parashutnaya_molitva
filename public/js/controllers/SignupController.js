import SignupView from '../views/signup/SignupView.js';
import SignupModel from '../models/SignupModel.js';
import EventBus from '../lib/eventbus/eventbus.js';
import { HEADER } from '../lib/eventbus/events';

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
            globalEventBus.triggerEvent(HEADER.LOAD);
            if (sessionStorage.getItem('redirect')) {
                switch (sessionStorage.getItem('redirect')) {
                case 'multi':
                    router.change('/multiplayer');
                    sessionStorage.setItem('redirect', '');
                    return;
                }
            }
        });
        this.signupView = new SignupView({ eventBus });
        this.signupModel = new SignupModel(eventBus);
    }
}
