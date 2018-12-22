import './menu.less';
import '../../components/popup/gameoptionPopup/gameoptionPopup.less';
import View from '../../lib/view.js';
import '../../components/popup/offlinePopup/offline-popup.less';
import Menu from '../../components/menu/menu.js';

import template from './menu.tmpl.xml';

export default class MenuView extends View {
    constructor ({ eventBus = {}, globalEventBus = {} } = {}) {
        super(template, eventBus);
    }

    render (root, data = {}) {
        super.render(root, data);

        let menu;
        const menuSection = this.el.querySelector('.js-menu');
        if (navigator.onLine === false) {
            menu = new Menu([
                { textLabel: 'Singleplayer', href: '/singleplayer' },
                { textLabel: 'Multiplayer', href: '/multiplayer'},
                { textLabel: 'Leaderboard',
                    href: '',
                    clickCallback: this._onOfflineMultiplayerClick.bind(this),
                    isNavigate: false },
                { textLabel: 'About', href: '/about' }
            ]);
        } else {
            menu = new Menu([
                { textLabel: 'Singleplayer', href: '/singleplayer' },
                { textLabel: 'Multiplayer', href: '/multiplayer' },
                { textLabel: 'Leaderboard', href: '/leaderboard' },
                { textLabel: 'About', href: '/about' }
            ]);
        }

        menu.render(menuSection);

        this._offlinePopup = this.el.querySelector('.js-offline-popup');

        this._offlinePopup.querySelector('.js-menu-back-x-mark').addEventListener('click', () => {
            this._offlinePopup.classList.add('hidden');
        });
    }

    _onOfflineMultiplayerClick () {
        this._offlinePopup.classList.remove('hidden');
    }

}
