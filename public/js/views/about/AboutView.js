import View from '../../lib/view.js';
import template from './about.tmpl.xml';

class AboutView extends View {
    constructor ({ eventBus = {}, globalEventBus = {} } = {}) {
        super(template, eventBus, globalEventBus);
    }

}

export { AboutView };
