import './menu.less';
import View from '../../lib/view.js';
import '../../components/popup/offline-popup.less';
import Menu from '../../components/menu/menu.js';

import template from './menu.tmpl.xml';

export default class MenuView extends View {
    constructor ({ eventBus = {}, globalEventBus = {} } = {}) {
        super(template, eventBus);

        this._eventBus.subscribeToEvent('checkAuthResponse', this._onCheckAuthResponse.bind(this));
    }

    _onCheckAuthResponse({isAuth, online = true, error} = {}){
        let menu;
        const menuSection = this.el.querySelector('.js-menu');
        if (!isAuth && online) {
            menu = new Menu([
                { textLabel: 'Singleplayer', href: '/singleplayer'},
                { textLabel: 'Multiplayer', href: '/signin',
                    clickCallback: this._onNotAuthMultiplayerClick.bind(this), isNavigate: false},
                { textLabel: 'Leaderboard', href: '/leaderboard' },
                { textLabel: 'About', href: '/about' }
            ]);
        } else if (online === false) {
            menu = new Menu([
                { textLabel: 'Singleplayer', href: '/singleplayer'},
                { textLabel: 'Multiplayer', href: '',
                    clickCallback: this._onOfflineMultiplayerClick.bind(this), isNavigate: false},
                { textLabel: 'Leaderboard', href: '',
                    clickCallback: this._onOfflineMultiplayerClick.bind(this), isNavigate: false},
                { textLabel: 'About', href: '/about' }
            ]);
        } else {
            menu = new Menu([
                { textLabel: 'Singleplayer', href: '/singleplayer'},
                { textLabel: 'Multiplayer', href: '/multiplayer'},
                { textLabel: 'Leaderboard', href: '/leaderboard' },
                { textLabel: 'About', href: '/about' }
            ]);
        }


        menu.render(menuSection);

    }

    render (root, data = {}) {
        super.render(root, data);
        this._eventBus.triggerEvent('checkAuth');
        this._offlinePopup = this.el.querySelector('.js-offline-popup');

        this._offlinePopup.querySelector('.js-menu-back-x-mark').addEventListener('click', () => {
            this._offlinePopup.classList.add('hidden');
        });

    }

    _onOfflineMultiplayerClick(){
        this._offlinePopup.classList.remove('hidden');
    }

    _onNotAuthMultiplayerClick() {

    }
}
