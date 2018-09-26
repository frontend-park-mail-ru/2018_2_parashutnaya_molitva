import View from '../../lib/view.js';
import template from './menu.xml';

export default class MenuView extends View {
    constructor({eventBus = {}, globalEventBus = {}} = {}) {
        super(template, eventBus, globalEventBus);
        this._globalEventBus = globalEventBus;
    }

    render(root, data = {}) {
        super.render(root, data);
        this._globalEventBus.triggerEvent('mainRender');
    }
}
