import {errors, SigninView} from "../views/signin/SigninView.js"
import SigninModel from "../models/SigninModel";
import EventBus from "../lib/eventbus";

const eventist = [
    'signin',
    'signinResponse',
    'signinSuccess',
];

export default class SigninController {
    constructor(router) {
        this._eventBus = new EventBus(eventist);
        this._eventBus.subscribeToEvent('signinSuccess', router.toStartPage.bind(router));

        this.signinView = new SigninView(this._eventBus);
        this.signinModel = new SigninModel(this._eventBus);
    }
}