import SignupView from "../views/signup/SignupView.js"
import SignupModel from "../models/SignupModel";

export default class SignupController {
    constructor(router) {
        this.signupView = new SignupView();
        this.signupModel = new SignupModel();
        this.router = router;
        this.signupView.addListener('submit', this.onSubmit.bind(this));
    }

    onSubmit(ev, data) {
        ev.preventDefault();

        this.signinModel.signin((xhr) => {
            if (xhr.status === 401) {
                const err = JSON.parse(xhr.responseText);
                SignupView.showWarning(err.error)
            } else if (xhr.status === 200) {
                this.router.toStartPage();
            }
        }, data)
    }
}