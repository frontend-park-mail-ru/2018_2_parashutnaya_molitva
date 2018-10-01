import View from '../../lib/view.js';
import template from './profile.tmpl.js';
import SignupView from "../signup/SignupView.js";

export default class ProfileView extends View {
    constructor({eventBus = {}} = {}) {
        super(template, eventBus);
        this._eventBus.subscribeToEvent('checkAuthResponse', this._onCheckAuthResponse.bind(this));
        this._eventBus.subscribeToEvent('loadUserResponse', this._onLoadUserResponse.bind(this));

        this._eventBus.subscribeToEvent('changeEmailResponse', this._onChangeEmailResponse.bind(this));
        this._eventBus.subscribeToEvent('changePasswordResponse', this._onChangePassResponse.bind(this));
        this._eventBus.subscribeToEvent('changeAvatarResponse', this._onChangeAvatarResponse.bind(this));
        this._eventBus.subscribeToEvent('changeAvatarSuccess', this._onChangeAvatarSuccess.bind(this));
        this._eventBus.subscribeToEvent('submitEmailSuccess', this._onSubmitEmailSucces.bind(this));
        this._eventBus.subscribeToEvent('submitPasswordSuccess', this._onSubmitPasswordSucces.bind(this));


    }

    render(root, data = {}) {
        this._prevRoot = root;
        this._eventBus.triggerEvent('checkAuth');
    }

    _onChangeAvatarResponse(data){
        console.log(data.error);
    }

    _onChangeAvatarSuccess(data){
        if (!data.avatar){
            console.log("No avatar");
            return;
        }

        this._avatar.src=data.avatar;

    }

    _onCheckAuthResponse(data = {}) {
        if (data.error || !data.isAuth) {
            this._eventBus.triggerEvent('checkAuthError');
            return;
        }

        this._eventBus.triggerEvent('loadUser', data);
    }

    _onLoadUserResponse(data = {}) {
        if (data.error || !data.user) {
            this._eventBus.triggerEvent('checkAuthError');
            return;
        }

        super.render(null, data);

        this._initElements();
    }

    _initElements() {

        this._avatar = this.el.querySelector('.js-avatar');
        this._avatarUploader = this.el.querySelector('.js-upload-avatar');

        this._emailBlock = this.el.querySelector('.js-email-row');
        this._emailEditButton = this._emailBlock.querySelector('button');
        this._emailField = this._emailBlock.querySelector('.js-email-field');

        this._emailFormWrapper = this.el.querySelector('.js-email-form');
        this._emailForm = this._emailFormWrapper.querySelector('form');
        this._emailWarning = this._emailFormWrapper.querySelector('.js-warning-email');

        this._emailSubmitButton = this._emailForm.querySelector('.js-button-submit');
        this._emailCancelButton = this._emailForm.querySelector('.js-button-cancel');
        this._emailInputEmailForm = this._emailForm.elements['email'];

        this._passwordBlock = this.el.querySelector('.js-password-row');
        this._passwordEditButton = this._passwordBlock.querySelector('button');

        this._passwordFormWrapper = this.el.querySelector('.js-password-form');
        this._passwordForm = this._passwordFormWrapper.querySelector('form');
        this._passWarning = this._passwordFormWrapper.querySelector('.js-warning-password');

        this._passwordSubmitButton = this._passwordForm.querySelector('.js-button-submit');
        this._passwordCancelButton = this._passwordForm.querySelector('.js-button-cancel');
        this._passwordInputPasswordForm = this._passwordForm.elements['password'];

        this._initElementsEvents();
        this._initEventBusEvents();
    }

    _initElementsEvents() {
        this._avatarUploader.addEventListener('change', () => {
            this._eventBus.triggerEvent('changeAvatar', {avatar: this._avatarUploader.files[0]});
        });

        this._emailEditButton.addEventListener('click', () => {
            this._showElement(this._emailFormWrapper);
            this._hideElement(this._emailBlock);
        });
        this._emailCancelButton.addEventListener('click', (ev) => {
            ev.preventDefault();
            this._hideElement(this._emailFormWrapper);
            this._showElement(this._emailBlock);
        });

        this._emailSubmitButton.addEventListener('click', (ev) => {
            ev.preventDefault();
            this._eventBus.triggerEvent('submitEmail', {email: this._emailInputEmailForm.value});
        });

        this._passwordEditButton.addEventListener('click', () => {
            this._showElement(this._passwordFormWrapper);
            this._hideElement(this._passwordBlock);
        });
        this._passwordCancelButton.addEventListener('click', (ev) => {
            ev.preventDefault();
            this._hideElement(this._passwordFormWrapper);
            this._showElement(this._passwordBlock);
        });

        this._passwordSubmitButton.addEventListener('click', (ev) => {
            ev.preventDefault();
            this._eventBus.triggerEvent('submitPassword', {pass: this._passwordInputPasswordForm.value});
        })

    }

    _initEventBusEvents() {
        this._emailInputEmailForm.addEventListener('input',
            this._onChangeEmail.bind(this, this._emailInputEmailForm));

        this._passwordInputPasswordForm.addEventListener('change',
            this._onChangePass.bind(this, this._passwordInputPasswordForm));
    }

    _onSubmitEmailSucces(data) {
        this._hideElement(this._emailFormWrapper);
        this._showElement(this._emailBlock);

        if (!data.email) {
            return;
        }

        this._emailField.innerHTML = data.email;

    }

    _onSubmitPasswordSucces(data) {
        this._hideElement(this._passwordFormWrapper);
        this._showElement(this._passwordBlock);
    }

    _onChangePass(passEl) {
        const pass = passEl.value;
        this._eventBus.triggerEvent('changePassword', {pass});
    }

    _onChangeEmail(emailEl) {
        const email = emailEl.value;
        this._eventBus.triggerEvent('changeEmail', {email});
    }

    _onChangePassResponse(data) {
        this._onChangeResponseTmpl(data.error, this._passwordInputPasswordForm, this._passWarning);
    }

    _onChangeEmailResponse(data) {
        this._onChangeResponseTmpl(data.error, this._emailInputEmailForm, this._emailWarning);
    }

    _onChangeResponseTmpl(error, el, warning) {
        if (error) {
            SignupView.showWarning(el, warning, error);
            return;
        }

        SignupView._clearWarning(el, warning);
    }


    _showElement(el) {
        if (el.classList.contains('hidden')) {
            el.classList.remove('hidden');
        }
    }

    _hideElement(el) {
        if (!el.classList.contains('hidden')) {
            el.classList.add('hidden');
        }
    }

}
