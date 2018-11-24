import Validation from '../lib/validation.js';
import Api from '../lib/api.js';

export default class SigninModel {
    constructor (eventBus) {
        this._eventBus = eventBus;
        this._eventBus.subscribeToEvent('signin', this._onSignin.bind(this));
    }

    _onSignin (data) {
        const loginOrEmail = data.loginOrEmail;
        const pass = data.pass;

        const errLoginOrEmail = Validation.validateLoginOrEmail(loginOrEmail);

        if (errLoginOrEmail) {
            const res = {
                field: 'login_or_email',
                error: errLoginOrEmail
            };
            this._eventBus.triggerEvent('signinResponse', res);
            return;
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

        this._eventBus.triggerEvent('loadWaiting');

        Api.signIn({
            loginOrEmail,
            password: data.pass
        }).then(resp => {
            if (resp.status === 200) {
                resp
                    .json()
                    .then(data => this._eventBus.triggerEvent('signinSuccess', data));
            } else {
                resp
                    .json()
                    .then(data => this._eventBus.triggerEvent('signinResponse', data));
            }
        });
    }
}
