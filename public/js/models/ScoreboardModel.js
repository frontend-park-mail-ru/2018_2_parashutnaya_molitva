import Net from "../lib/net";

export default class ScoreboardModel {
    constructor(eventBus) {
        this._eventBus = eventBus;
        this._eventBus.subscribeToEvent('load', this._onLoad.bind(this));
        this._eventBus.subscribeToEvent('loadPaginator', this._onLoadPaginator.bind(this));

        this._linksCount = 4;
        this._pageLines = 3;
    }

    _onLoadPaginator() {
        Net.doGet({
            url: `/api/scoreboard/?lines=${this._pageLines}`,
        })
            .then(resp => resp.json())
            .then(data => {

                if (data.result){
                    data.result.linksCount = this._linksCount;
                }
                this._eventBus.triggerEvent('loadPaginatorResponse', data);
            })
    }

    _onLoad({pageNum = 1} = {}) {
        Net.doGet({
            url: `/api/scoreboard/pages?page=${pageNum}&lines=${this._pageLines}`
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
