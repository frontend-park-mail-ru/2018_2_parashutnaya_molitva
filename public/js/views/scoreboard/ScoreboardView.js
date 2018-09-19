import View from '../../lib/view.js';
import template from './scoreboard.xml';

class ScoreboardView extends View {
    constructor(eventBus) {
        super(template, eventBus);
        this._eventBus.subscribeToEvent('loadResponse', this._onLoadResponse.bind(this));
        this._eventBus.subscribeToEvent('loadWaiting', this._onLoadWaiting.bind(this));
    }


    render(root, data = {}) {
        super.render(root, data);
        this._loadingEl = this.el.querySelector(".scoreboard__loading");
        this._eventBus.triggerEvent('load');
    }

    _onLoadWaiting() {
        this._loadingEl.classList.remove("hidden");

    }

    _endLoadWaiting() {
        if (!this._loadingEl.classList.contains("hidden")) {
            this._loadingEl.classList.add("hidden");
        }
    }

    _onLoadResponse(data) {
        this._endLoadWaiting();
        const error = data.error;

        if (error) {
            // TODO: on error
            return;
        }

        this.el.innerHTML = this.template({users: data});
    }
}

export {ScoreboardView}