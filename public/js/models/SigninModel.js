import Validation from '../lib/validation.js';
import Api from "../lib/api.js";

export default class SigninModel {
    constructor(eventBus) {
        this._eventBus = eventBus;
        this._eventBus.subscribeToEvent('signin', this._onSignin.bind(this));
    }

    _onSignin(data) {
        const email = data.email;
        const pass = data.pass;
        const errEmail = Validation.validateEmail(email, true);

        if (errEmail) {
            const res = {
                field: 'email',
                error: errEmail
            };
            this._eventBus.triggerEvent('signinResponse', res);
        }

        const errPass = Validation.validatePassword(pass, false);

        if (errPass) {
            const res = {
                field: 'pass',
                error: errPass
            };

            this._eventBus.triggerEvent('signinResponse', res);
            return;
        }

        Api.signIn({
            email,
            password : data.pass,
        }).then(resp => {
            if (resp.status === 200) {
                resp
                    .json()
                    .then(data => this._eventBus.triggerEvent('signinSuccess', data))
            } else {
                resp
                    .json()
                    .then(data => this._eventBus.triggerEvent('signinResponse', data));
            }
        });
    }
}
