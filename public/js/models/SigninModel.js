import Validation from "../lib/validation";
import doReq from "../lib/net";


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

        doReq({
            callback: (resp) => {
                if (resp.status === 401) {
                    resp.json().then((parsedData) => this._eventBus.triggerEvent("signinResponse", parsedData));
                } else if (resp.status === 200) {
                    this._eventBus.triggerEvent('signinSuccess');
                }
            },
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            credentials: 'same-origin',
            url : '/api/signin',
        })
    }
}