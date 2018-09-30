import View from '../../lib/view.js';
// import template from './profile.tmpl.xml';
import template from './profile.tmpl.js';

export default class ProfileView extends View {
    constructor ({ eventBus = {} } = {}) {
        super(template, eventBus);
    }
    render (root, data = {}) {
        super.render(root, data);
    }
}
