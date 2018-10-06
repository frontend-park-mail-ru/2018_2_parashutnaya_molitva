import View from '../../lib/view.js';
import Menu from '../../components/menu/menu.js';
import template from './menu.tmpl.xml';

export default class MenuView extends View {
    constructor ({ eventBus = {}, globalEventBus = {} } = {}) {
        super(template, eventBus);
    }

    render (root, data = {}) {
        super.render(root, data);

        const menuSection = this.el.querySelector('.menu.section');
        const menu = new Menu([
            { textLabel: 'Singleplayer' },
            { textLabel: 'Multiplayer' },
            { textLabel: 'Scoreboard', href: '/scoreboard' },
            { textLabel: 'About', href: '/about' }
        ]);

        menu.render(menuSection);
    }
}
