import Net from "../lib/net";
import Api from "../lib/api";

export default class MultiplayerModel {
    constructor (eventBus) {
        this._eventBus = eventBus;
        // this._eventBus.subscribeToEvent('checkAuth', this._onCheckAuth.bind(this));
        this._eventBus.subscribeToEvent('findGame', this._onFindGame.bind(this));
    }


    _onCheckAuth() {
        Net.doGet({url: '/api/session'})
            .then(response => {
                if (response.status !== 200) {
                    response.json().then(data => this._eventBus.triggerEvent('checkAuthResponse', {
                        isAuth: false,
                        online: navigator.onLine,
                        error: data.error
                    }));
                } else {
                    this._eventBus.triggerEvent('checkAuthResponse', {
                        isAuth: true,
                        online: navigator.onLine,
                    });
                }
            })
            .catch((error) => {
                    this._eventBus.triggerEvent('checkAuthResponse', {error, online: navigator.onLine});
                }
            )
    }
}