import ProfileView from '../views/profile/ProfileView.js';
import ProfileModel from '../models/ProfileModel.js';
import EventBus from '../lib/eventbus/eventbus.js';
import {SERVICE} from "../lib/eventbus/events";

const eventList = [
    SERVICE.CHECK_AUTH,
    SERVICE.CHECK_AUTH_RESPONSE,
    SERVICE.LOAD_USER,
    SERVICE.LOAD_USER_RESPONSE,
    'checkAuth',
    'checkAuthResponse',
    'loadUser',
    'loadUserResponse',
    'checkAuthError',
    'changeEmail',
    'changeEmailResponse',
    'changePassword',
    'changePasswordResponse',
    'changeAvatar',
    'changeAvatarResponse',
    'changeAvatarSuccess',
    'submitEmail',
    'submitEmailResponse',
    'submitEmailSuccess',
    'submitPassword',
    'submitPasswordResponse',
    'submitPasswordSuccess'
];

export default class ProfileController {
    constructor ({ router, globalEventBus } = {}) {
        const eventBus = new EventBus(eventList);

        eventBus.subscribeToEvent('checkAuthError', () => {
            router.toStartPage(true);
        });

        this.profileView = new ProfileView({ eventBus });
        this.profileModel = new ProfileModel(eventBus, globalEventBus);
    }
}
