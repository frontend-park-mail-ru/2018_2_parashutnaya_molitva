import Validation from '../lib/validation.js';
import Net from '../lib/net.js';
import Api from '../lib/api.js';
import {User} from '../lib/user.js';
import {HEADER} from "../lib/eventbus/events";

export default class ProfileModel {
    constructor(eventBus, globalEventBus) {
        this._eventBus = eventBus;
        this._globalEventBus = globalEventBus;

        this._eventBus.subscribeToEvent('changeEmail', this._onChangeEmail.bind(this));
        this._eventBus.subscribeToEvent('changePassword', this._onChangePassword.bind(this));
        this._eventBus.subscribeToEvent('changeAvatar', this._onChangeAvatar.bind(this));

        this._eventBus.subscribeToEvent('submitEmail', this._onSubmitEmail.bind(this));
        this._eventBus.subscribeToEvent('submitPassword', this._onSubmitPassword.bind(this));
        this._eventBus.subscribeToEvent('checkAuth', this._onCheckAuth.bind(this));
        this._eventBus.subscribeToEvent('loadUser', this._onLoadUser.bind(this));
    }

    _onChangeAvatar(data) {
        const avatar = data.avatar;

        const errAvatar = Validation.validateAvatar(avatar);
        if (errAvatar) {
            this._eventBus.triggerEvent('changeAvatarResponse', {error: errAvatar});
            console.log(errAvatar);
            return;
        }

        Api.uploadAvatar({avatar})
            .then(res => res.json())
            .then(res => {
                if (!res.avatar || res.error) {
                    this._eventBus.triggerEvent('changeAvatarResponse', res);
                } else {
                    Api.updateUser({guid: this._currentUserGUID, avatar: res.avatar});
                    this._eventBus.triggerEvent('changeAvatarSuccess', {avatar: Net.getStorageURL() + res.avatar});
                    User.removeUser();
                    this._globalEventBus.triggerEvent(HEADER.LOAD);
                }
            });
    }

    _onSubmitPassword(data) {
        const pass = data.pass;
        const errPass = Validation.validatePassword(pass);
        if (errPass) {
            this._eventBus.triggerEvent('changePasswordResponse', {error: errPass});
            return;
        }

        Api.updateUser({
            guid: this._currentUserGUID,
            password: pass
        }).then(res => {
            if (res.ok) {
                this._eventBus.triggerEvent('submitPasswordSuccess', {password: pass});
            } else {
                res.json().then(dataResponse => {
                    if (dataResponse.field === 'password') {
                        this._eventBus.triggerEvent('changePasswordResponse', {error: dataResponse.error});
                    }
                });
            }
        });
    }

    _onSubmitEmail(data) {
        const email = data.email;
        const errEmail = Validation.validateEmail(email, true);
        if (errEmail) {
            this._eventBus.triggerEvent('changeEmailResponse', {error: errEmail});
            return;
        }

        Api.updateUser({
            guid: this._currentUserGUID,
            email
        }).then(res => {
            if (res.ok) {
                this._eventBus.triggerEvent('submitEmailSuccess', {email});
            } else {
                res.json().then(dataResponse => {
                    if (dataResponse.field === 'email') {
                        this._eventBus.triggerEvent('changeEmailResponse', {error: dataResponse.error});
                    }
                });
            }
        });
    }

    _onChangePassword(data) {
        const pass = data.pass;
        const errPass = Validation.validatePassword(pass);
        if (errPass) {
            this._eventBus.triggerEvent('changePasswordResponse', {error: errPass});
            return;
        }

        this._eventBus.triggerEvent('changePasswordResponse', {});
    }

    _onChangeEmail(data) {
        const email = data.email;
        const errEmail = Validation.validateEmail(email, true);

        if (errEmail) {
            this._eventBus.triggerEvent('changeEmailResponse', {error: errEmail});
            return;
        }

        this._eventBus.triggerEvent('changeEmailResponse', {});
    }


    _onLoadUser(data = {}) {
        this._currentUserGUID = data.user_guid;

        if (!User.checkUser()) {
            if (!this._currentUserGUID) {
                this._eventBus.triggerEvent('loadUserResponse', {});
            }

            Api.loadUser(this._currentUserGUID)
                .then(user => {
                    if (user.error) {
                        this._eventBus.triggerEvent('loadUserResponse', {});
                    } else {
                        const toSetUser = {
                            avatar: (user.avatar === '' ? 'images/default-avatar.svg' : Net.getStorageURL() + user.avatar),
                            score: user.score || 0,
                            login: user.login || "Nouserlogin",
                            email: user.email,
                            guid: user.guid,
                        };
                        User.setUser({...toSetUser});

                        this._currentUserGUID = user.guid;
                        this._eventBus.triggerEvent('loadUserResponse', {user: toSetUser});
                    }
                });
        } else {
            this._eventBus.triggerEvent('loadUserResponse', {user: {
                    login: User.login,
                    guid: User.guid,
                    score: User.score,
                    avatar: User.avatar,
                    email: User.email,
                }});
        }
    }

    _onCheckAuth() {
        Net.doGet({url: '/api/session'})
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
            .catch((error) => {
                    this._eventBus.triggerEvent('checkAuthResponse', {error});
                }
            )
    }
}
