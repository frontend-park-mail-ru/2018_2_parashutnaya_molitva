const errEmailIsEmpty = "Email is empty";
const errPassIsEmpty = "Pass is empty";
const errEmailIsInvalid = "Email is invalid";

export default class SigninModel {
    constructor(eventBus) {
        this._eventBus = eventBus;
        this._eventBus.subscribeToEvent('signin', this._onSignin.bind(this));
    }

    _onSignin(data) {
        const email = data.email;
        const pass = data.pass;

        if (!email) {
            const res = {
                field: "email",
                error: errEmailIsEmpty,
            };
            this._eventBus.triggerEvent("signinResponse", res);
            return;
        }

        if (!pass) {
            const res = {
                field: "pass",
                error: errPassIsEmpty,
            };

            this._eventBus.triggerEvent("signinResponse", res);
            return;
        }

        if (!SigninModel.validateEmail(email)) {

            const res = {
                field: "email",
                error: errEmailIsInvalid,
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

    static validateEmail(email) {
        // RFC 2822. Покрывает 99.99% адресов.
        let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return re.test(String(email).toLowerCase());
    }
}