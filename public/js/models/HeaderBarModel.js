import Net from '../lib/net.js';
import Api from '../lib/api.js';

export default class HeaderBarModel {
    constructor (eventBus, globalEventBus) {
        this._eventBus = eventBus;
        this._globalEventBus = globalEventBus;
        this._eventBus.subscribeToEvent('checkAuth', this._onCheckAuth.bind(this));
        this._eventBus.subscribeToEvent('signout', this._onSignout.bind(this));
        this._eventBus.subscribeToEvent('loadAvatar', this._onLoadAvatar.bind(this));
    }

    _onLoadAvatar (data) {
        if (!data.user_guid) {
            this._eventBus.triggerEvent('loadAvatarResponse', {});
            return;
        }

        Api.loadUser(data.user_guid)
            .then(user => {
                if (user.error) {
                    this._eventBus.triggerEvent('loadAvatarResponse', data);
                } else {
                    data.avatar = user.avatar === '' ? '' : Net.getStorageURL() + user.avatar;
                    data.score = user.score;
                    this._eventBus.triggerEvent('loadAvatarResponse', data);
                    this._globalEventBus.triggerEvent('setUser', { ...user });
                }
            });
    }

    _onCheckAuth () {
        Api.checkSession()
            .then(response => {
                if (response.status !== 200) {
                    response.json().then(data => this._eventBus.triggerEvent('checkAuthResponse', {
                        isAuth: false,
                        error: data.error
                    }));
                } else {
                    response.json().then(data => this._eventBus.triggerEvent('checkAuthResponse', {
                        isAuth: true,
                        user_guid: data.user_guid
                    }));
                }
            })
            .catch(error => console.error(error));
    }

    _onSignout () {
        Api.removeSession();
        this._eventBus.triggerEvent('signoutResponse', { isAuth: false });
        this._globalEventBus.triggerEvent('removeUser');
    }
}
