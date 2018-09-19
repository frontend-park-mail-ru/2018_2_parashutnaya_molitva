import View from '../../lib/view.js';
import template from './scoreboard.xml';

class ScoreboardView extends View {
    constructor(eventBus) {
        super(template, eventBus);
        this._eventBus.subscribeToEvent('loadResponse', this._onLoadResponse.bind(this));
    }

    render(root, data = {}) {
        super.render(root, data);
        this._eventBus.triggerEvent('load');
    }

    _onLoadResponse(data) {
        const error = data.error;

        if (error) {
            // TODO: on error
            return;
        }

        this.el.innerHTML = this.template({users: data});
    }
}

export {ScoreboardView}