import View from '../../lib/view.js';
import template from './signup.xml';

const emptyEmailWarning = "Email is empty";
const emptyPasswordWarning = "Password is empty";
const emptyRepasswordWarning = "Please repeat password";
const invalidEmailWarning = "Email is invalid";
const invalidPasswordWarning = "Must contain at least 8 characters, 1 number, 1 upper and 1 lowercase";
const invalidPassAndRepass = "Password and Repeat password is different";

export default class SignupView extends View {
    constructor(eventBus) {
        super(template, eventBus);
        this._eventBus.subscribeToEvent('changeEmailResponse', this._onChangeEmailResponse.bind(this));
        this._eventBus.subscribeToEvent('changePasswordResponse', this._onChangePassResponse.bind(this));
        this._eventBus.subscribeToEvent('changePasswordRepeatResponse', this._onChangeRepassResponse.bind(this));
        this._eventBus.subscribeToEvent('signupResponse', this._onSignupResponse.bind(this));
    }

    render(root, data = {}) {
        super.render(root, data);
        let warnings = this.el.querySelectorAll(".signup__warning");
        this._emailWarning = warnings[0];
        this._passWarning = warnings[1];
        this._repassWarning = warnings[2];

        this._form = this.el.querySelector(".signup__form");

        let emailEl = this._form.elements['email'];
        emailEl.addEventListener('change', this._onChangeEmail.bind(this, emailEl));

        let password = this._form.elements['password'];
        let repassword = this._form.elements['password-repeat'];
        password.addEventListener('change', this._onChangePass.bind(this, password, repassword));
        repassword.addEventListener('change', this._onChangeRepass.bind(this, repassword, password));

        this._form.addEventListener('submit', this._onSubmit.bind(this));
    }

    _onSignupResponse(data){
        const field = data.field;
        const error = data.error;

        if (error && field) {
            switch (field) {
                case 'email':
                    this._onChangeEmailResponse({error});
                    break;
                case 'pass':
                    this._onChangePassResponse({error});
                    break;
                case 'repass':
                    this._onChangeRepassResponse({error});
                    break;
                default:
                    console.log('SignupView: _onSignupResponse: no such field: ', field);
            }
        }
        // TODO: Если пустая ошибка или нет поля. Но этот коллбэк вызывается только если Модель получила ошибку 401 от сервера.
    }

    _onChangeRepassResponse(data) {
        this._onChangeResponseTmpl(data.error, 'password-repeat', this._repassWarning)
    }

    _onChangePassResponse(data) {
       this._onChangeResponseTmpl(data.error, 'password', this._passWarning)
    }

    _onChangeEmailResponse(data) {
        this._onChangeResponseTmpl(data.error, 'email', this._emailWarning)
    }

    _onChangeResponseTmpl(error, name, warning){
        const el = this._form.elements[name];

        if (error) {
            SignupView.showWarning(el, warning, error);
            return;
        }

        SignupView._clearWarning(el, warning);
    }

    _onChangeRepass(repassEl, passEl) {
        const repass = repassEl.value;
        const pass = passEl.value;
        this._eventBus.triggerEvent('changePasswordRepeat', {repass, pass});
    }

    _onChangePass(passEl, repassEl) {
        const pass = passEl.value;
        const repass = repassEl.value;
        this._eventBus.triggerEvent('changePassword', {pass, repass});

    }

    _onChangeEmail(emailEl) {
        const email = emailEl.value;
        this._eventBus.triggerEvent('changeEmail', {email});
    }

    _onSubmit(ev) {
        ev.preventDefault();
        const email = this._form.elements['email'].value;
        const pass = this._form.elements['password'].value;
        const repass = this._form.elements['password-repeat'].value;

        this._eventBus.triggerEvent('signup', {email, pass, repass});
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

}
