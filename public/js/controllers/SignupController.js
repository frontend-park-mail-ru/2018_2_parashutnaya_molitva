import {errors, SigninView} from "../views/signup/SignupView.js"
import SigninModel from "../models/SignupModel";

export default class SigninController {
    constructor(router) {
        this.signinView = new SigninView();
        this.signinModel = new SigninModel();
        this.router = router;
        this.signinView.addListener('submit', this.onSubmit.bind(this));
    }

    onSubmit(ev, data) {
        ev.preventDefault();

        this.signinModel.signin((xhr) => {
            if (xhr.status === 401) {
                const err = JSON.parse(xhr.responseText);
                this.signinView.showWarning(err.error)
            } else if (xhr.status === 200) {
                this.router.toStartPage();
            }
        }, data)
    }
}