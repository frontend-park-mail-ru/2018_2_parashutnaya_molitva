import SigninView from "../views/signin/SigninView.js"
import SigninModel from "../models/SigninModel";

export default class SigninController {
    constructor(router){
        this.signinView = new SigninView();
        this.signinModel = new SigninModel();
        this.signinView.addListener('submit', this.onSubmit.bind(this));
        this.router = router
    }

    onSubmit(ev, data){
        ev.preventDefault();
        this.router._change("/");
    }
}