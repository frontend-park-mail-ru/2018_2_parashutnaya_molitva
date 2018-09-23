import Validation from "../lib/validation";


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
                field: "email",
                error: errEmail,
            };
            this._eventBus.triggerEvent("signinResponse", res);
        }


        const errPass = Validation.validatePassword(pass, false);

        if (errPass) {
            const res = {
                field: "pass",
                error: errPass,
            };

            this._eventBus.triggerEvent("signinResponse", res);
            return;
        }

        this._signin((xhr) => {
            if (xhr.status === 401) {
                const res = JSON.parse(xhr.responseText);
                this._eventBus.triggerEvent("signinResponse", res);
            } else if (xhr.status === 200) {
                console.log('Is ok');
                this._eventBus.triggerEvent('signinSuccess');
            }
        }, data);

    }

    _signin(callback, data) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/signin", true);
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
}