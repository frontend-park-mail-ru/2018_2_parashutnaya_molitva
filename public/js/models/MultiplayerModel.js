import Net from "../lib/net";
import Api from "../lib/api";

export default class MultiplayerModel {
    constructor (eventBus) {
        this._eventBus = eventBus;
        // this._eventBus.subscribeToEvent('checkAuth', this._onCheckAuth.bind(this));
        this._eventBus.subscribeToEvent('findGame', this._onFindGame.bind(this));
    }


    _onFindGame({duration = 5*60} = {}) {
        Api.findRoom({duration: duration*60})
            .then(response => {
                if (response.status !== 200){
                    console.log("Error status: " + response.status);
                } else {
                    response.json()
                        .then(data => {
                            if (!data.roomid) {
                                console.log("Invalid room id:" + data.roomid);
                            } else {
                                console.log("Connecting");
                                this._eventBus.triggerEvent('initGame', {roomid: data.roomid});
                            }
                        })
                }
            })
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
                    this._eventBus.triggerEvent('checkAuthResponse', {
                        isAuth: true,
                    });
                }
            })
            .catch((error) => {
                    this._eventBus.triggerEvent('checkAuthResponse', {error});
                }
            )
    }
}