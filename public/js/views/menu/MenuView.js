import './menu.less';
import View from '../../lib/view.js';
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
                    clickCallback: this._onNotAuthMultiplayerClick.bind(this)},
                { textLabel: 'Leaderboard', href: '/scoreboard' },
                { textLabel: 'About', href: '/about' }
            ]);
        } else if (online === false) {
            menu = new Menu([
                { textLabel: 'Singleplayer', href: '/singleplayer'},
                { textLabel: 'Multiplayer', href: '',
                    clickCallback: this._onOfflineMultiplayerClick.bind(this)},
                { textLabel: 'Leaderboard', href: '/scoreboard' },
                { textLabel: 'About', href: '/about' }
            ]);
        } else {
            menu = new Menu([
                { textLabel: 'Singleplayer', href: '/singleplayer'},
                { textLabel: 'Multiplayer', href: '/multiplayer'},
                { textLabel: 'Leaderboard', href: '/scoreboard' },
                { textLabel: 'About', href: '/about' }
            ]);
        }


        menu.render(menuSection);

    }

    render (root, data = {}) {
        super.render(root, data);
        this._eventBus.triggerEvent('checkAuth');
        this._gameOptionsPopup = this.el.querySelector('.js-game-options-popup');
    }

    _onOfflineMultiplayerClick(){
        console.log("offline");
    }

    _onNotAuthMultiplayerClick() {

    }
}
