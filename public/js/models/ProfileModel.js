import Validation from '../lib/validation.js';
import Net from '../lib/net.js';
import Api from '../lib/api.js';

export default class ProfileModel {
    constructor (eventBus, globalEventBus) {
        this._eventBus = eventBus;
        this._globalEventBus = globalEventBus;

        this._eventBus.subscribeToEvent('changeEmail', this._onChangeEmail.bind(this));
        this._eventBus.subscribeToEvent('changePassword', this._onChangePassword.bind(this));
        this._eventBus.subscribeToEvent('changeAvatar', this._onChangeAvatar.bind(this));

        this._eventBus.subscribeToEvent('submitEmail', this._onSubmitEmail.bind(this));
        this._eventBus.subscribeToEvent('submitPassword', this._onSubmitPassword.bind(this));
        this._eventBus.subscribeToEvent('checkAuth', this._onCheckAuth.bind(this));
        this._eventBus.subscribeToEvent('loadUser', this._onLoadUser.bind(this));
        this._globalEventBus.subscribeToEvent('checkUserResponse', this._onCheckUserResponse.bind(this));
    }

    _onChangeAvatar (data) {
        const avatar = data.avatar;

        Api.uploadAvatar({ avatar })
            .then(res => res.json())
            .then(res => {
                if (!res.avatar || res.error) {
                    this._eventBus.triggerEvent('changeAvatarResponse', res);
                } else {
                    Api.updateUser({ guid: this._currentUserGUID, avatar: res.avatar });
                    this._eventBus.triggerEvent('changeAvatarSuccess', { avatar: Net.getStorageURL() + res.avatar });
                    this._globalEventBus.triggerEvent('removeUser');
                    this._globalEventBus.triggerEvent('renderHeaderBar');
                }
            });
    }

    _onSubmitPassword (data) {
        const pass = data.pass;
        const errPass = Validation.validatePassword(pass, true);
        if (errPass) {
            this._eventBus.triggerEvent('changePasswordResponse', { error: errPass });
            return;
        }

        Api.updateUser({
            guid: this._currentUserGUID,
            password: pass
        }).then(res => {
            if (res.status === 200) {
                this._eventBus.triggerEvent('submitPasswordSuccess', { password: pass });
            }
        });
    }

    _onSubmitEmail (data) {
        const email = data.email;
        const errEmail = Validation.validateEmail(email, true);
        if (errEmail) {
            this._eventBus.triggerEvent('changeEmailResponse', { error: errEmail });
            return;
        }

        Api.updateUser({
            guid: this._currentUserGUID,
            email
        }).then(res => {
            if (res.status === 200) {
                this._eventBus.triggerEvent('submitEmailSuccess', { email });
            }
        });
    }

    _onChangePassword (data) {
        const pass = data.pass;
        const errPass = Validation.validatePassword(pass, true);
        if (errPass) {
            this._eventBus.triggerEvent('changePasswordResponse', { error: errPass });
            return;
        }

        this._eventBus.triggerEvent('changePasswordResponse', {});
    }

    _onChangeEmail (data) {
        const email = data.email;
        const errEmail = Validation.validateEmail(email, true);

        if (errEmail) {
            this._eventBus.triggerEvent('changeEmailResponse', { error: errEmail });
            return;
        }

        this._eventBus.triggerEvent('changeEmailResponse', {});
    }

    _onCheckUserResponse (data = {}) {
        if (!data.isUpload) {
            if (!this._currentUserGUID) {
                this._eventBus.triggerEvent('loadUserResponse', {});
            }

            Api.loadUser(this._currentUserGUID)
                .then(user => {
                    if (user.error) {
                        this._eventBus.triggerEvent('loadUserResponse', {});
                    } else {
                        this._globalEventBus.triggerEvent('setUser', { ...user });

                        this._currentUserGUID = user.guid;
                        user.avatar = !user.avatar ? 'default-avatar.svg' : Net.getStorageURL() + user.avatar;
                        this._eventBus.triggerEvent('loadUserResponse', { user });
                    }
                });
        } else {
            data.user.avatar = !data.user.avatar ? 'default-avatar.svg' : Net.getStorageURL() + data.user.avatar;
            this._currentUserGUID = data.user.guid;
            this._eventBus.triggerEvent('loadUserResponse', { user: data.user });
        }
    }

    _onLoadUser (data = {}) {
        this._currentUserGUID = data.user_guid;
        this._globalEventBus.triggerEvent('checkUser');
    }

    _onCheckAuth () {
        Net.doGet({ url: '/api/session' })
            .then(response => {
                if (response.status !== 200) {
                    response.json().then(data => this._eventBus.triggerEvent('checkAuthResponse', {
                        isAuth: false,
                        error: data.error
                    }));
                } else {
                    response.json().then(data => {
                        this._eventBus.triggerEvent('checkAuthResponse', {
                            isAuth: true,
                            user_guid: data.user_guid
                        });
                    });
                }
            })
            .catch(error => console.error(error));
    }
}
