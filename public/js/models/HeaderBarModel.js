import Net from '../lib/net.js';

export default class HeaderBarModel {
    constructor (eventBus) {
        this._eventBus = eventBus;
        this._eventBus.subscribeToEvent('checkAuth', this._onCheckAuth.bind(this));
        this._eventBus.subscribeToEvent('signout', this._onSignout.bind(this));
    }

    _onCheckAuth () {
        this._checkSession((xhr) => {
            const isAuth = xhr.status === 200;
            this._eventBus.triggerEvent('checkAuthResponse', { isAuth });
        });
    }

    _checkSession(callback) {
        Net.doGet({url:"/api/session"})
            .then(response => {
                if (!response.ok) {
                    throw new Error(`fetch error (url: ${response.url}, status: ${response.status})`);
                }
                callback(response);
            })
            .catch(error => console.error(error));
    }

    _onSignout () {
        HeaderBarModel.removeSession();
        this._eventBus.triggerEvent('signoutResponse', { isAuth: false });
    }

    static removeSession() {
        Net.doDelete({url:"/api/session"})
            .then(response => {
                if (!response.ok) {
                    throw new Error(`fetch error (url: ${response.url}, status: ${response.status})`);
                }
            })
            .catch(error => console.error(error));
    }
}
