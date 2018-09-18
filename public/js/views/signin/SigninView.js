import View from "../../lib/view.js"
import template from "./signin.xml"

export const errors = {
    emptyWarning: "Email or password is empty",
    invalidWarning: "Email is invalid",
};

export class SigninView extends View {
    constructor() {
        super(template);
    }

    render(root, data) {
        super.render(root, data);
        let form = this.el.querySelector(".signin__form");
        this.warning = this.el.querySelector(".signin__warning");
        form.addEventListener("submit", this._formValidation.bind(this, form));
    }

    static validateEmail(email) {
        // RFC 2822. Покрывает 99.99% адресов.
        let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return re.test(String(email).toLowerCase());
    }

    showWarning(text) {
        this._clearWarning();
        this.warning.innerHTML = `<p>${text}</p>`;
    }

    _clearWarning() {
        this.warning.innerHTML = "";
    }


    _formValidation(form, ev) {
        ev.preventDefault();
        const email = form.elements["email"];
        const pass = form.elements["password"];

        if (!email.value || !pass.value) {
            this.showWarning(errors.emptyWarning);
            return;
        }

        if (!SigninView.validateEmail(email.value)) {
            this.showWarning(errors.invalidWarning);
            return;
        }

        this._clearWarning();
        let data = {
            email: email.value,
            pass: pass.value,
        };
        this.listeners.get("submit")(ev, data)
    }
}