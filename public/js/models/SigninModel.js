import Validation from '../lib/validation.js';
import Net from '../lib/net.js';

export default class SigninModel {
    constructor (eventBus) {
        this._eventBus = eventBus;
        this._eventBus.subscribeToEvent('signin', this._onSignin.bind(this));
    }

    _onSignin (data) {
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

        Net.doPost({
            url: '/api/signin/',
            body: data
        }).then(resp => {
            if (resp.status === 200) {
                this._eventBus.triggerEvent('signinSuccess', {});
            } else {
                resp
                    .json()
                    .then(data => this._eventBus.triggerEvent('signinResponse', data));
            }
        });
    }
}
