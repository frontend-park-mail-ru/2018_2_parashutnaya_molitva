import View from '../../lib/view.js';
import template from './signup.xml';

const emptyEmailWarning = "Email is empty";
const emptyPasswordWarning = "Password is empty";
const emptyRepasswordWarning = "Please repeat password";
const invalidEmailWarning = "Email is invalid";
const invalidPasswordWarning = "Must contain at least 8 characters, 1 number, 1 upper and 1 lowercase";
const invalidPassAndRepass = "Password and Repeat password is different";

export default class SignupView extends View {

    constructor() {
        super(template)
    }

    render(root, data = {}) {
        super.render(root, data);
        let warnings = this.el.querySelectorAll(".signup__warning");
        this._emailWarning = warnings[0];
        this._passWarnings = [warnings[1], warnings[2]];

        let form = this.el.querySelector(".signup__form");
        //debugger;
        let emailEl = form.elements['email'];
        emailEl.addEventListener('change', this._formEmailValidation.bind(this, emailEl));

        let password = form.elements['password'];
        let repassword = form.elements['password-repeat'];
        password.addEventListener('change', this._formPassValidation.bind(this, password));
        repassword.addEventListener('change', this._formRepassValidation.bind(this, repassword, password));

        form.addEventListener('submit', this._formValidation.bind(this, form));
    }

    static validateEmail(email) {
        // RFC 2822. Покрывает 99.99% адресов.
        let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return re.test(String(email).toLowerCase());
    }

    static validPass(pass) {
        let re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.{8,})/;
        return re.test(pass);
    }

    static showWarning(el, warningEl, text) {
        el.classList.add("signup__input-warning");
        warningEl.classList.remove("signup__warning-hidden");
        warningEl.innerHTML = `${text}`;
    }

    static _clearWarning(el, warningEl) {
        el.classList.remove("signup__input-warning");
        warningEl.classList.add("signup__warning-hidden");
        warningEl.innerHTML = '';
    }

    _formRepassValidation(repassEl, passEl) {
        const repass = repassEl.value;
        const pass = passEl.value;

        if (!repass) {
            SignupView.showWarning(passEl, this._passWarnings[1], emptyRepasswordWarning);
            this._valid = false;
            return;
        }


        if (repass !== pass) {
            SignupView.showWarning(repassEl, this._passWarnings[1], invalidPassAndRepass);
            this._valid = false;
            return;
        }

        this._valid = true;
        SignupView._clearWarning(passEl, this._passWarnings[1]);
    }

    _formPassValidation(passEl) {
        const pass = passEl.value;
        if (!pass) {
            SignupView.showWarning(passEl, this._passWarnings[0], emptyPasswordWarning);
            this._valid = false;
            return;
        }

        if (!SignupView.validPass(pass)) {
            SignupView.showWarning(passEl, this._passWarnings[0], invalidPasswordWarning);
            this._valid = false;
            return;
        }

        this._valid = true;
        SignupView._clearWarning(passEl, this._passWarnings[0]);
    }

    _formEmailValidation(el) {
        const email = el.value;

        if (!email) {
            SignupView.showWarning(el, this._emailWarning, emptyEmailWarning);
            this._valid = false;
            return;
        }

        if (!SignupView.validateEmail(email)) {
            SignupView.showWarning(el, this._emailWarning, invalidEmailWarning);
            this._valid = false;
            return;
        }

        this._valid = true;
        SignupView._clearWarning(el, this._emailWarning);
    }

    _formValidation(form, ev) {
        ev.preventDefault();
        const email = form.elements["email"];
        const pass = form.elements['password'];
        const repass = form.elements['password-repeat'];

        if (this._valid) {
            const data = {
                email: email.value,
                pass: pass.value,
                repass: repass.value,
            };

            this.listeners.get('submit')(ev, data);
        }

    }
}
