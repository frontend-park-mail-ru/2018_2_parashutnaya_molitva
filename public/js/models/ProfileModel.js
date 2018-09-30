import Validation from '../lib/validation.js';
import Net from '../lib/net.js';
import Api from "../lib/api.js";

export default class ProfileModel {
    constructor(eventBus, globalEventBus) {
        this._eventBus = eventBus;
        this._globalEventBus = globalEventBus;

        this._eventBus.subscribeToEvent('checkAuth', this._onCheckAuth.bind(this));
        this._eventBus.subscribeToEvent('loadUser', this._onLoadUser.bind(this));
        this._globalEventBus.subscribeToEvent('checkUserResponse', this._onCheckUserResponse.bind(this));

    }

    _onCheckUserResponse(data = {}) {
        if (!data.isUpload) {
            if (!this._currentUserGUID) {
                this._eventBus.triggerEvent('loadUserResponse', {});
            }

            Api.loadUser(this._currentUserGUID)
                .then(user => {
                    if (user.error) {
                        this._eventBus.triggerEvent('loadUserResponse', {});
                    } else {
                        this._eventBus.triggerEvent('loadUserResponse', {user});
                        this._globalEventBus.triggerEvent('setUser', {...user});
                    }
                })

        } else {
            if (!data.user.avatar) {
                data.user.avatar = "default-avatar.svg";
            }
            this._eventBus.triggerEvent('loadUserResponse', {user: data.user});
        }
    }

    _onLoadUser(data = {}) {
        this._currentUserGUID = data.user_guid;
        this._globalEventBus.triggerEvent('checkUser');
    }

    _onCheckAuth() {
        Net.doGet({url: "/api/session"})
            .then(response => {
                if (response.status !== 200) {
                    response.json().then(data => this._eventBus.triggerEvent('checkAuthResponse', {
                        isAuth: false,
                        error: data.error,
                    }))
                } else {
                    response.json().then(data => {
                        this._eventBus.triggerEvent('checkAuthResponse', {
                            isAuth: true,
                            user_guid: data.user_guid,
                        })
                    });
                }
            })
            .catch(error => console.error(error));
    }
}
