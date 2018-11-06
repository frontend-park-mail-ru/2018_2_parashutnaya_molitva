import View from '../../lib/view.js';

import template from './menu.tmpl.xml';

export default class MenuView extends View {
    constructor ({ eventBus = {}, globalEventBus = {} } = {}) {
        super(template, eventBus);
    }

    render (root, data = {}) {
        super.render(root, data);
    }
}
