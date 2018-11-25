import View from '../../lib/view.js';
import template from './about.tmpl.xml';
import Menu from '../../components/menu/menu.js';

class AboutView extends View {
    constructor ({ eventBus = {}, globalEventBus = {} } = {}) {
        super(template, eventBus, globalEventBus);
    }

    render (root, data = {}) {
        super.render(root, data);
    }
}

export { AboutView };
