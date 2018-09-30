import ProfileView from '../views/profile/ProfileView.js';
import ProfileModel from '../models/ProfileModel.js';
import EventBus from '../lib/eventbus.js';

const eventList = [
    ''
];

export default class ProfileController {
    constructor ({ router, globalEventBus } = {}) {
        const eventBus = new EventBus(eventList);
        //TODO: если не зареган - выкидывать на главную страницу
        // eventBus.subscribeToEvent('signupSuccess', () => {
        //     router.toStartPage();
        //     globalEventBus.triggerEvent('renderHeaderBar');
        // });
        this.profileView = new ProfileView({ eventBus });
        this.profileModel = new ProfileModel(eventBus);
    }
}
