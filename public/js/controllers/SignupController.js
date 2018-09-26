import SignupView from "../views/signup/SignupView.js"
import SignupModel from "../models/SignupModel";
import EventBus from "../lib/eventbus";

const eventList = [
    'signup',
    'signupResponse',
    'signupSuccess',
    'changeEmail',
    'changeEmailResponse',
    'changePassword',
    'changePasswordResponse',
    'changePasswordRepeat',
    'changePasswordRepeatResponse',
];

export default class SignupController {
    constructor(router) {
        const eventBus = new EventBus(eventList);
        eventBus.subscribeToEvent('signupSuccess', router.toStartPage.bind(router));
        this.signupView = new SignupView({eventBus});
        this.signupModel = new SignupModel(eventBus);
    }
}