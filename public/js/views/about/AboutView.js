import View from '../../lib/view.js';
import template from './about.tmpl.xml';
import Menu from '../../components/menu/menu.js';

class AboutView extends View {
    constructor ({ eventBus = {}, globalEventBus = {} } = {}) {
        super(template, eventBus, globalEventBus);
    }

    render (root, data = {}) {
        super.render(root, data);

        const aboutSection = this.el.querySelector('.about.section');
        const menu = new Menu([
            { textLabel: 'Repo', href: 'https://github.com/frontend-park-mail-ru/2018_2_parashutnaya_molitva' },
            { textLabel: '@SinimaWath', href: 'https://github.com/SinimaWath' },
            { textLabel: '@ksenobait09', href: 'https://github.com/ksenobait09' },
            { textLabel: '@Chubasik', href: 'https://github.com/Chubasik' },
            { textLabel: 'Menu', href: '/' }
        ]);

        menu.render(aboutSection);
    }
}

export { AboutView };
