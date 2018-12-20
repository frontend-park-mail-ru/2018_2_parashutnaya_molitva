import '../../components/popup/changePasswordPopup/changePasswordPopup.less';
import './profile.less';
import View from '../../lib/view.js';
import template from './profile.tmpl.xml';
import SignupView from '../signup/SignupView.js';

export default class ProfileView extends View {
    constructor ({ eventBus = {} } = {}) {
        super(template, eventBus);
        this._eventBus.subscribeToEvent('checkAuthResponse', this._onCheckAuthResponse.bind(this));
        this._eventBus.subscribeToEvent('loadUserResponse', this._onLoadUserResponse.bind(this));

        this._eventBus.subscribeToEvent('changePasswordResponse', this._onChangePassResponse.bind(this));
        this._eventBus.subscribeToEvent('changeAvatarResponse', this._onChangeAvatarResponse.bind(this));
        this._eventBus.subscribeToEvent('changeAvatarSuccess', this._onChangeAvatarSuccess.bind(this));
        this._eventBus.subscribeToEvent('submitPasswordSuccess', this._onSubmitPasswordSucces.bind(this));
    }

    render (root, data = {}) {
        this._prevRoot = root;
        this._eventBus.triggerEvent('checkAuth');
    }

    _onChangeAvatarResponse (data) {
        if (data.error) {
            this._showElement(this._avatarUploaderWarning);
            this._avatarUploaderWarning.innerHTML = data.error;
        } else {
            this._hideElement(this._avatarUploaderWarning);
            this._avatarUploaderWarning.innerHTML = '';
        }
    }

    _onChangeAvatarSuccess (data) {
        if (!data.avatar) {
            console.log('No avatar');
            return;
        }

        this._avatarUploaderWarning.classList.add('hidden');
        this._avatarUploaderWarning.innerHTML = '';

        this._avatar.src = data.avatar;
    }

    _onCheckAuthResponse (data = {}) {
        if (data.error || !data.isAuth) {
            this._eventBus.triggerEvent('checkAuthError');
            return;
        }

        this._eventBus.triggerEvent('loadUser', data);
    }

    _onLoadUserResponse (data = {}) {
        if (data.error || !data.user) {
            this._eventBus.triggerEvent('checkAuthError');
            return;
        }

        super.render(null, data);

        this._initElements();
    }

    _initElements () {
        this._avatar = this.el.querySelector('.js-avatar');
        this._avatarUploader = this.el.querySelector('.js-upload-avatar');
        this._avatarUploaderWarning = this.el.querySelector('.js-warning-avatar');

        this._passwordChangePopup = this.el.querySelector('.js-change-pass-popup');
        this._passwordBlock = this.el.querySelector('.js-password-row');
        this._passwordEditButton = this._passwordBlock;

        this._passwordForm = this._passwordChangePopup.querySelector('.js-password-form');

        this._passwordSubmitButton = this._passwordForm.querySelector('.js-button-submit');
        this._passwordCancelButton = this._passwordChangePopup.querySelector('.js-change-password-x-mark');
        this._passwordInputPasswordForm = this._passwordForm.elements['password'];

        this._passWarning = this._passwordChangePopup.querySelector('.js-warning-password');

        this._initElementsEvents();
        this._initEventBusEvents();
    }

    _initElementsEvents () {
        this._avatarUploader.addEventListener('change', () => {
            this._eventBus.triggerEvent('changeAvatar', { avatar: this._avatarUploader.files[0] });
        });

        this._passwordEditButton.addEventListener('click', () => {
            this._showElement(this._passwordChangePopup);
        });
        this._passwordCancelButton.addEventListener('click', (ev) => {
            ev.preventDefault();
            this._hideElement(this._passwordChangePopup);
        });

        this._passwordSubmitButton.addEventListener('click', (ev) => {
            ev.preventDefault();
            this._eventBus.triggerEvent('submitPassword', { pass: this._passwordInputPasswordForm.value });
        });
    }

    _initEventBusEvents () {
        this._passwordInputPasswordForm.addEventListener('change',
            this._onChangePass.bind(this, this._passwordInputPasswordForm));
    }


    _onSubmitPasswordSucces (data) {
        this._hideElement(this._passwordChangePopup);
    }

    _onChangePass (passEl) {
        const pass = passEl.value;
        this._eventBus.triggerEvent('changePassword', { pass });
    }

    _onChangePassResponse (data) {
        this._onChangeResponseTmpl(data.error, this._passwordInputPasswordForm, this._passWarning);
    }


    _onChangeResponseTmpl (error, el, warning) {
        if (error) {
            SignupView.showWarning(el, warning, error);
            return;
        }

        SignupView._clearWarning(el, warning);
    }

    _showElement (el) {
        if (el.classList.contains('hidden')) {
            el.classList.remove('hidden');
        }
    }

    _hideElement (el) {
        el.classList.add('hidden');
    }
}
