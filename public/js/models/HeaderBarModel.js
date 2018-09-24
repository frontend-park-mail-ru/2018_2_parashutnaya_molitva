export default class HeaderBarModel {

    constructor(eventBus) {
        this._eventBus = eventBus;
        this._eventBus.subscribeToEvent('checkAuth', this._onCheckAuth.bind(this));
        this._eventBus.subscribeToEvent('signout', this._onSignout.bind(this));
    }

    _onCheckAuth() {
        this._checkSession((xhr) => {
            const isAuth = xhr.status === 200;
            this._eventBus.triggerEvent("checkAuthResponse", {isAuth});
        })
    }

    _checkSession(callback) {
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open("GET", "/api/checkSession", true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) {
                return
            }

            callback(xhr);
        };
        xhr.send();

    }

    _onSignout() {
        HeaderBarModel.removeSession();
        this._eventBus.triggerEvent("signoutResponse", {isAuth: false});
    }

    static removeSession() {
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open("GET", "/api/removeSession", true);
        xhr.send();
    }
}