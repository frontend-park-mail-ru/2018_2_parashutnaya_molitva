const errEmailIsEmpty = "Email is empty";
const errPassIsEmpty = "Pass is empty";
const errEmailIsInvalid = "Email is invalid";
const errInvalidPasswordData = "Must contain at least 8 characters, 1 number, 1 upper and 1 lowercase";
const errNotEqualPassRePass = "Password and Password Repeat are not equal";

export default class SignupModel {

    constructor(eventBus) {
        this._eventBus = eventBus;
        this._eventBus.subscribeToEvent('changeEmail', this._onChangeEmail.bind(this));
        this._eventBus.subscribeToEvent('changePassword', this._onChangePassword.bind(this));
        this._eventBus.subscribeToEvent('changePasswordRepeat', this._onChangePasswordRepeat.bind(this));
        this._eventBus.subscribeToEvent('signup', this._onSignup.bind(this));

        this._validInputMap = {
            pass: false,
            repass: false,
            email: false,
        };
    }

    _onSignup(data) {

        const isValid = Object.entries(this._validInputMap).reduce((res, el) => (res && el[1]), true);

        if (isValid) {

            this._signup((xhr) => {
                if (xhr.status === 200) {
                    this._eventBus.triggerEvent('signupSuccess', {});
                } else if (xhr.status === 401) {
                    const err = JSON.parse(xhr.responseText);
                    this._eventBus.triggerEvent('signupResponse', err);
                }
            }, data)
        } else {
            this._onChangePassword(data);
            this._onChangePasswordRepeat(data);
            this._onChangeEmail(data);
        }
    }

    _onChangePasswordRepeat(data) {
        const repass = data.repass;
        const pass = data.pass;
        if (!repass) {
            this._validInputMap['repass'] = false;
            this._eventBus.triggerEvent('changePasswordRepeatResponse', {error: errPassIsEmpty});
            return;
        }

        if (pass !== repass) {
            this._validInputMap['repass'] = false;
            this._eventBus.triggerEvent('changePasswordRepeatResponse', {error: errNotEqualPassRePass});
            return;
        }

        this._validInputMap['repass'] = true;
        this._eventBus.triggerEvent('changePasswordRepeatResponse', {});
    }

    _onChangePassword(data) {
        const pass = data.pass;
        if (!pass) {
            this._validInputMap['pass'] = false;
            this._eventBus.triggerEvent('changePasswordResponse', {error: errPassIsEmpty});
            return;
        }

        if (!SignupModel.validatePass(pass)) {
            this._validInputMap['pass'] = false;
            this._eventBus.triggerEvent('changePasswordResponse', {error: errInvalidPasswordData});
            return;
        }

        this._validInputMap['pass'] = true;
        this._eventBus.triggerEvent('changePasswordResponse', {});
    }

    _onChangeEmail(data) {
        const email = data.email;
        if (!email) {
            this._validInputMap['email'] = false;
            this._eventBus.triggerEvent('changeEmailResponse', {error: errEmailIsEmpty});
            return;
        }

        if (!SignupModel.validateEmail(email)) {
            this._validInputMap['email'] = false;
            this._eventBus.triggerEvent('changeEmailResponse', {error: errEmailIsInvalid});
            return;
        }

        this._validInputMap['email'] = true;
        this._eventBus.triggerEvent('changeEmailResponse', {});
    }

    _signup(callback, data) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/signup", true);
        xhr.withCredentials = true;

        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) {
                return;
            }

            callback(xhr)
        };

        xhr.send(JSON.stringify(data))

    }

    static validateEmail(email) {
        // RFC 2822. Покрывает 99.99% адресов.
        let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return re.test(String(email).toLowerCase());
    }

    static validatePass(pass) {
        // На продакшене исопльзовать регулярку
        // let re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.{8,})/;
        // return re.test(pass);

        return true;
    }

}