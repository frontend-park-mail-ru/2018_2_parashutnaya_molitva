import './menu.less';
import View from '../../lib/view.js';
import Menu from '../../components/menu/menu.js';

import template from './menu.tmpl.xml';

export default class MenuView extends View {
    constructor ({ eventBus = {}, globalEventBus = {} } = {}) {
        super(template, eventBus);

        this._eventBus.subscribeToEvent('checkAuthResponse', this._onCheckAuthResponse.bind(this));
    }

    _onCheckAuthResponse(data){
        const isAuth = data.isAuth;
        let menu;
        const menuSection = this.el.querySelector('.menu.section');
        if (!isAuth) {
            menu = new Menu([
                { textLabel: 'Singleplayer', href: '/singleplayer'},
                { textLabel: 'Multiplayer', href: this._onNotAuthMultiplayerClick.bind(this)},
                { textLabel: 'Scoreboard', href: '/scoreboard' },
                { textLabel: 'About', href: '/about' }
            ]);
        } else {
            menu = new Menu([
                { textLabel: 'Singleplayer', isNavigate: false},
                { textLabel: 'Multiplayer', isNavigate: false},
                { textLabel: 'Scoreboard', href: '/scoreboard' },
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

    _onNotAuthMultiplayerClick() {
        
    }
}
