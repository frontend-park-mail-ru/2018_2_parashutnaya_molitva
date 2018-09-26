import {errors, SigninView} from "../views/signin/SigninView.js"
import SigninModel from "../models/SigninModel";
import EventBus from "../lib/eventbus";

const eventList = [
    'signin',
    'signinResponse',
    'signinSuccess',
];

export default class SigninController {
    constructor(router) {
        const eventBus = new EventBus(eventList);
        eventBus.subscribeToEvent('signinSuccess', router.toStartPage.bind(router));

        this.signinView = new SigninView({eventBus});
        this.signinModel = new SigninModel(eventBus);
    }
}