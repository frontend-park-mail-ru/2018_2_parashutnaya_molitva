import View from "../../lib/view.js"
import template from "./signin.xml"

export const errors = {
    emptyWarning: "Email or password is empty",
    invalidWarning: "Email is invalid",
};

export class SigninView extends View {
    constructor(eventBus) {
        super(template, eventBus);
        this._eventBus.subscribeToEvent("signinResponse", this._onSubmitResponse.bind(this));
    }

    render(root, data) {
        super.render(root, data);
        let form = this.el.querySelector(".signin__form");
        this.warning = this.el.querySelector(".signin__warning");
        form.addEventListener("submit", this._onSubmit.bind(this, form));
    }

    _onSubmit(form, ev) {
        ev.preventDefault();
        const data = {
            email: form.elements["email"].value,
            password: form.elements["password"].value,
        };
        this._eventBus.triggerEvent("signin", data);
    }

    _onSubmitResponse(data) {
        const field = data.field;
        const error = data.error;
        if (error) {
           if (field){
               this.showWarning(error);
           }
        }
    }

    showWarning(text) {
        this._clearWarning();
        this.warning.innerHTML = `<p>${text}</p>`;
    }

    _clearWarning() {
        this.warning.innerHTML = "";
    }

}