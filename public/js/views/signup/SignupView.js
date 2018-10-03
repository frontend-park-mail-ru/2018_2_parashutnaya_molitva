import View from '../../lib/view.js';

// import template from './signup.tmpl.xml';
import template from './signup.tmpl.js';

export default class SignupView extends View {
    constructor ({ eventBus = {} } = {}) {
        super(template, eventBus);
        this._eventBus.subscribeToEvent('changeEmailResponse', this._onChangeEmailResponse.bind(this));
        this._eventBus.subscribeToEvent('changePasswordResponse', this._onChangePassResponse.bind(this));
        this._eventBus.subscribeToEvent('changePasswordRepeatResponse', this._onChangeRepassResponse.bind(this));
        this._eventBus.subscribeToEvent('loadWaiting', this._onLoadWaiting.bind(this));
        this._eventBus.subscribeToEvent('signupResponse', this._onSignupResponse.bind(this));
    }

    render (root, data = {}) {
        super.render(root, data);

        this._loadingEl = this.el.querySelector('.loading');

        this._warning = this.el.querySelector('.js-warning-common');

        this._emailWarning = this.el.querySelector('.js-warning-email');
        this._passWarning = this.el.querySelector('.js-warning-password');
        this._repassWarning = this.el.querySelector('.js-warning-repassword');

        this._form = this.el.querySelector('.signup__form');

        this._emailInput = this._form.elements['email'];
        this._emailInput.addEventListener('change', this._onChangeEmail.bind(this, this._emailInput));

        this._passwordInput = this._form.elements['password'];
        this._repasswordInput = this._form.elements['password-repeat'];

        this._passwordInput.addEventListener('change', this._onChangePass.bind(this, this._passwordInput, this._repasswordInput));
        this._repasswordInput.addEventListener('change', this._onChangeRepass.bind(this, this._repasswordInput, this._passwordInput));

        this._form.addEventListener('submit', this._onSubmit.bind(this));
    }

    _showWarning (text) {
        this._clearWarning();
        this._warning.innerHTML = `<p>${text}</p>`;
    }

    _clearWarning () {
        this._warning.innerHTML = '';
    }

    _onSignupResponse (data) {
        this._endLoadWaiting();
        const error = data.error;
        const field = data.field;

        if (!field) {
            if (error) {
                this._showWarning(error);
            } else {
                this._clearWarning();
            }
            return;
        }

        switch (field) {
        case 'email':
            this._onChangeEmailResponse(data);
            break;
        case 'password':
            this._onChangePassResponse(data);
            break;
        default:
            console.error('Undefined field:' + field);
            break;
        }
    }

    _onChangeRepassResponse (data) {
        this._onChangeResponseTmpl(data.error, this._repasswordInput, this._repassWarning);
    }

    _onChangePassResponse (data) {
        this._onChangeResponseTmpl(data.error, this._passwordInput, this._passWarning);
    }

    _onChangeEmailResponse (data) {
        this._onChangeResponseTmpl(data.error, this._emailInput, this._emailWarning);
    }

    _onChangeResponseTmpl (error, el, warning) {
        if (error) {
            SignupView.showWarning(el, warning, error);
            return;
        }

        SignupView._clearWarning(el, warning);
    }

    _onChangeRepass (repassEl, passEl) {
        const repass = repassEl.value;
        const pass = passEl.value;
        this._eventBus.triggerEvent('changePasswordRepeat', { repass, pass });
    }

    _onChangePass (passEl, repassEl) {
        const pass = passEl.value;
        const repass = repassEl.value;
        this._eventBus.triggerEvent('changePassword', { pass, repass });
    }

    _onChangeEmail (emailInput) {
        const email = emailInput.value;
        this._eventBus.triggerEvent('changeEmail', { email });
    }

    _onSubmit (ev) {
        ev.preventDefault();
        const email = this._form.elements['email'].value;
        const pass = this._form.elements['password'].value;
        const repass = this._form.elements['password-repeat'].value;

        this._eventBus.triggerEvent('signup', { email, pass, repass });
    }

    _onLoadWaiting () {
        // Индикатор загрузки появляется только, если загрузка происходит дольше 100 мс
        this._loadingTimeOut = setTimeout(() => this._loadingEl.classList.remove('hidden'), 100);
    }

    _endLoadWaiting () {
        clearTimeout(this._loadingTimeOut);
        if (!this._loadingEl.classList.contains('hidden')) {
            this._loadingEl.classList.add('hidden');
        }
    }

    static showWarning (el, warningEl, text) {
        el.classList.add('signup__input_warning');
        warningEl.classList.remove('hidden');
        warningEl.innerHTML = `${text}`;
    }

    static _clearWarning (el, warningEl) {
        el.classList.remove('signup__input_warning');
        warningEl.classList.add('hidden');
        warningEl.innerHTML = '';
    }
}
