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
        this._eventBus = new EventBus(eventList);
        this._eventBus.subscribeToEvent('signupSuccess', router.toStartPage.bind(router));
        this.signupView = new SignupView(this._eventBus);
        this.signupModel = new SignupModel(this._eventBus);
    }
}