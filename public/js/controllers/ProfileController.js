import ProfileView from '../views/profile/ProfileView.js';
import ProfileModel from '../models/ProfileModel.js';
import EventBus from '../lib/eventbus.js';

const eventList = [
    'checkAuth',
    'checkAuthResponse',
    'checkAuthError',
    'loadUser',
    'loadUserResponse',
];

export default class ProfileController {
    constructor ({ router, globalEventBus } = {}) {
        const eventBus = new EventBus(eventList);

        eventBus.subscribeToEvent('checkAuthError', () => {
            router.toStartPage();
        });

        this.profileView = new ProfileView({ eventBus });
        this.profileModel = new ProfileModel(eventBus, globalEventBus);
    }
}
