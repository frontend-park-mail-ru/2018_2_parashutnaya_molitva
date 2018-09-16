import View from "../../lib/view.js"
import template from "./signin.xml"

export default class SigninView extends View {
    constructor(){
        super(template);
        this.listeners = new Map();
    }

    render(root, data){
        super.render(root, data);
        let form = this.el.querySelector(".signin__form");
        this.formSubmitCallback = (ev) => {
            this.formValidation(ev, form)
        };
        form.addEventListener("submit", this.formSubmitCallback);
    }

    addListener(name, func){
        this.listeners.set(name, func);
    }

    validateEmail(email) {
        // RFC 2822. Покрывает 99.99% адресов.
        let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return re.test(String(email).toLowerCase());
    }


    formValidation(ev, form){
        ev.preventDefault();
        const email = form.elements["email"];
        const pass = form.elements["password"];
        let warning = this.el.querySelector(".signin__warning");

        if (!email.value || !pass.value){
            warning.innerHTML = "";
            warning.innerHTML = "<p>Email or password is empty</p>";
            return;
        }

        if (!this.validateEmail(email.value)){
            warning.innerHTML = "";
            warning.innerHTML = "<p>Not valid Email</p>";
            return;
        }

        warning.innerHTML = "";
        this.listeners.get("submit")(ev)
    }
}