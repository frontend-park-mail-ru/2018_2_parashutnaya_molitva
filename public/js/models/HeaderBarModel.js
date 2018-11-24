import Net from '../lib/net.js';
import Api from '../lib/api.js';
import {User} from '../lib/user.js';
import {SERVICE} from "../lib/eventbus/events";

export default class HeaderBarModel {
    constructor (eventBus, globalEventBus) {
        this._eventBus = eventBus;
        this._globalEventBus = globalEventBus;
        this._eventBus.subscribeToEvent(SERVICE.CHECK_AUTH, this._onCheckAuth.bind(this));
        this._eventBus.subscribeToEvent(SERVICE.SIGNOUT, this._onSignout.bind(this));
        this._eventBus.subscribeToEvent(SERVICE.LOAD_USER, this._onLoadUser.bind(this));
    }

    _onLoadUser (data) {
        if (!data.user_guid) {
            this._eventBus.triggerEvent(SERVICE.LOAD_USER_RESPONSE, {});
            return;
        }

        Api.loadUser(data.user_guid)
            .then(user => {
                if (user.error) {
                    this._eventBus.triggerEvent(SERVICE.LOAD_USER_RESPONSE, data);
                } else {

                    data.user = {
                        avatar: (user.avatar === '' ? 'images/default-avatar.svg' : Net.getStorageURL() + user.avatar),
                        score: user.score || 0,
                        login: user.login || "Nouserlogin",
                        email: user.email,
                        guid: user.guid,
                    };

                    this._eventBus.triggerEvent(SERVICE.LOAD_USER_RESPONSE, data);
                    User.setUser({...data.user});
                }
            });
    }

    _onCheckAuth () {
        Api.checkSession()
            .then(response => {
                if (response.status !== 200) {
                    response.json().then(data => this._eventBus.triggerEvent(SERVICE.CHECK_AUTH_RESPONSE, {
                        isAuth: false,
                        error: data.error
                    }));
                } else {
                    response.json().then(data => this._eventBus.triggerEvent(SERVICE.CHECK_AUTH_RESPONSE, {
                        isAuth: true,
                        user_guid: data.user_guid
                    }));
                }
            })
            .catch(error => console.error(error));
    }

    _onSignout () {
        Api.removeSession();
        this._eventBus.triggerEvent(SERVICE.CHECK_AUTH_RESPONSE, { isAuth: false });
        User.removeUser();
    }
}
