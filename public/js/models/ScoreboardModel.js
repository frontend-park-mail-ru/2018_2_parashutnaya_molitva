import Net from "../lib/net";

export default class ScoreboardModel {
    constructor(eventBus) {
        this._eventBus = eventBus;
        this._eventBus.subscribeToEvent('load', this._onLoad.bind(this));
    }

    _onLoad() {
        Net.doGet({
            url: '/api/scoreboard'
        }).then(resp => {
            if (resp.status === 200) {
                return resp.json();
            }
            throw new Error("Can't load scoreboard: " + resp.status);
        }).then(data =>
            this._eventBus.triggerEvent('loadResponse', data)
        ).catch(err => {
            console.error(err);
            this._eventBus.triggerEvent('loadResponse', {});
        });

        this._eventBus.triggerEvent('loadWaiting');
    }
}
