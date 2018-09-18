import View from '../../lib/view.js';
import template from './signup.xml';

const emptyEmailWarning = "Email is empty";
const emptyPasswordWarning = "Password is empty";
const invalidEmailWarning = "Email is invalid";
const invalidPasswordWarning = "Must contain at least 8 characters, 1 number, 1 upper and 1 lowercase";

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
        form.addEventListener('submit', this._formValidation.bind(this, form));
    }

    static validateEmail(email) {
        // RFC 2822. Покрывает 99.99% адресов.
        let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return re.test(String(email).toLowerCase());
    }

    showWarning(el, warningEl, text) {
        el.classList.add("signup__input-warning");
        warningEl.classList.remove("signup__warning-hidden");
        warningEl.innerHTML = `${text}`;
    }

    _clearWarning(el, warningEl) {
        el.classList.remove("signup__input-warning");
        warningEl.classList.add("signup__warning-hidden");
        warningEl.innerHTML = '';
    }

    _formEmailValidation(el) {
        const email = el.value;

        if (!SignupView.validateEmail(email)) {
            this.showWarning(el, this._emailWarning, invalidEmailWarning);
            return;
        }

        this._clearWarning(el, this._emailWarning);

        //this.listeners.get("change")("email");
    }

    _formValidation(ev, form) {
        const email = form.elements["email"];
        const pass = form.elements['password'];
        const repass = form.elements['password-repeat'];
        const data = {};
        this.listeners.get('submit')(ev, data);
    }
}
