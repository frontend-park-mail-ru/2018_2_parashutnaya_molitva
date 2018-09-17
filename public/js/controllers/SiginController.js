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

        this.signinModel.signin((xhr)=>{
            if (xhr.status === 401){
                const err = JSON.parse(xhr.responseText);
                switch (err.error) {
                    case 'empty':
                        this.signinView.showEmptyWarning();
                        break;
                    case 'invalid email':
                        this.signinView.showNotValidEmailWarning();
                        break;
                    default:
                }
            }
        }, data)

        //     debugger;
        //     if (xhr.status === 200) {
        //         this.router._change("/");
        //     }
        // }, data);
    }
}