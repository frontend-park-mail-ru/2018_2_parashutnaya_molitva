import Validation from '../lib/validation.js';
import Net from '../lib/net.js';

export default class ProfileModel {
    constructor (eventBus) {
        this._eventBus = eventBus;
        // this._eventBus.subscribeToEvent('changeEmail', this._onChangeEmail.bind(this));
        // this._eventBus.subscribeToEvent('changePassword', this._onChangePassword.bind(this));
        // this._eventBus.subscribeToEvent('changePasswordRepeat', this._onChangePasswordRepeat.bind(this));
        // this._eventBus.subscribeToEvent('signup', this._onSignup.bind(this));

        this._validInputMap = {
            pass: false,
            repass: false,
            email: false
        };
    }
}
