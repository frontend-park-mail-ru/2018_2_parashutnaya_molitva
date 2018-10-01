import Api from "../lib/api.js";

export default class ScoreboardModel {
    constructor(eventBus) {
        this._eventBus = eventBus;
        this._eventBus.subscribeToEvent('load', this._onLoad.bind(this));
        this._eventBus.subscribeToEvent('loadPaginator', this._onLoadPaginator.bind(this));

        this._linksCount = 4;
        this._pageLines = 3;
    }

    _onLoadPaginator() {
        Api.getUserCount()
            .then(resp => resp.json())
            .then(users => {
                if (users.count) {
                    this._totalUsersCount = users.count;
                    this._eventBus.triggerEvent('loadPaginatorResponse', {
                        pagesCount: this._totalUsersCount / this._pageLines,
                        linksCount: this._linksCount
                    });
                }
            });
    }

    _onLoad({pageNum = 1} = {}) {
        this._eventBus.triggerEvent('loadWaiting');
        Api.getScore({
            limit: this._pageLines,
            offset: this._pageLines * (pageNum - 1),
        }).then(resp => {
            if (resp.status === 200) {
                return resp.json();
            }
            throw new Error("Can't load scoreboard: " + resp.status);
        }).then(data =>
            this._eventBus.triggerEvent('loadResponse', data.scores)
        ).catch(err => {
            console.error(err);
            this._eventBus.triggerEvent('loadResponse', {});
        });
    }
}
