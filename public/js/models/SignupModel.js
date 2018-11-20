import Validation from '../lib/validation.js';
import Api from '../lib/api.js';

export default class SignupModel {
    constructor (eventBus) {
        this._eventBus = eventBus;
        this._eventBus.subscribeToEvent('changeEmail', this._onChangeEmail.bind(this));
        this._eventBus.subscribeToEvent('changePassword', this._onChangePassword.bind(this));
        this._eventBus.subscribeToEvent('changePasswordRepeat', this._onChangePasswordRepeat.bind(this));
        this._eventBus.subscribeToEvent('signup', this._onSignup.bind(this));

        this._validInputMap = {
            pass: false,
            repass: false,
            email: false
        };
    }

    _onSignup (data) {
        const isValid = Object.entries(this._validInputMap).reduce((res, el) => (res && el[1]), true);

        if (isValid) {
            this._eventBus.triggerEvent('loadWaiting');
            Api.signUp({
                email: data.email,
                password: data.pass
            }).then(resp => {
                if (resp.status === 200) {
                    Api.signIn({
                        email: data.email,
                        password: data.pass,
                    }).then( (resp) => {
                        if (resp.status === 200) {
                            resp
                                .json()
                                .then(data => this._eventBus.triggerEvent('signupSuccess', data));
                        }
                    });
                } else {
                    resp
                        .json()
                        .then(data => this._eventBus.triggerEvent('signupResponse', data));
                }
            }).catch(err => {
                console.error(err.message);
            });
        } else {
            this._onChangePassword(data);
            this._onChangePasswordRepeat(data);
            this._onChangeEmail(data);
        }
    }

    _onChangePasswordRepeat (data) {
        const repass = data.repass;
        const pass = data.pass;
        const errRepass = Validation.validateRepass(repass, pass);

        if (errRepass) {
            this._validInputMap['repass'] = false;
            this._eventBus.triggerEvent('changePasswordRepeatResponse', { error: errRepass });
            return;
        }

        this._validInputMap['repass'] = true;
        this._eventBus.triggerEvent('changePasswordRepeatResponse', {});
    }

    _onChangePassword (data) {
        const pass = data.pass;
        const errPass = Validation.validatePassword(pass, true);
        if (errPass) {
            this._validInputMap['pass'] = false;
            this._eventBus.triggerEvent('changePasswordResponse', { error: errPass });
            return;
        }

        this._validInputMap['pass'] = true;
        this._eventBus.triggerEvent('changePasswordResponse', {});
    }

    _onChangeEmail (data) {
        const email = data.email;
        const errEmail = Validation.validateEmail(email, true);
        if (errEmail) {
            this._validInputMap['email'] = false;
            this._eventBus.triggerEvent('changeEmailResponse', { error: errEmail });
            return;
        }

        this._validInputMap['email'] = true;
        this._eventBus.triggerEvent('changeEmailResponse', {});
    }
}
