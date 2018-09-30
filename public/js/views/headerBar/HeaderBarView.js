import View from '../../lib/view.js';

// import template from './headerBar.tmpl.xml';

import template from './headerBar.tmpl.js';

export default class HeaderBarView extends View {
    constructor (eventBus, globalEventBus) {
        super(template, eventBus, globalEventBus);
        this._eventBus.subscribeToEvent('checkAuthResponse', this._onAuthResponse.bind(this));
        this._eventBus.subscribeToEvent('signoutResponse', this._onAuthResponse.bind(this));
        this._globalEventBus.subscribeToEvent('renderHeaderBar', this._onRenderHeader.bind(this));
    }

    render (root, data = {}) {
        super.render(root, data);
        this._eventBus.triggerEvent('checkAuth');
    }

    _onRenderHeader () {
        this._eventBus.triggerEvent('checkAuth');
    }

    _onAuthResponse (data) {
        const isAuth = data.isAuth;
        if (isAuth === undefined || isAuth === null) {
            console.log('No isAuth param');
            return;
        }

        super.render(null, data);
        if (data.isAuth) {
            let signoutButton = this.el.querySelector('.header-bar__button-signout');
            signoutButton.addEventListener('click', () => {
                this._eventBus.triggerEvent('signout');
            });
        }
    }
}
