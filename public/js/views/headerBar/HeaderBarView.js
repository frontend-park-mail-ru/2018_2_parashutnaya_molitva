import View from '../../lib/view.js';

// import template from './headerBar.tmpl.xml';

import template from './headerBar.tmpl.js';

export default class HeaderBarView extends View {
    constructor (eventBus, globalEventBus) {
        super(template, eventBus, globalEventBus);
        this._eventBus.subscribeToEvent('checkAuthResponse', this._onAuthResponse.bind(this));
        this._eventBus.subscribeToEvent('signoutResponse', this._onAuthResponse.bind(this));
        this._eventBus.subscribeToEvent('loadAvatarResponse', this._onLoadAvatarResponse.bind(this));
        this._globalEventBus.subscribeToEvent('renderHeaderBar', this._onRenderHeader.bind(this));
    }

    render (root, data = {}) {
        super.render(root, data);
        this._eventBus.triggerEvent('checkAuth');
    }

    _onRenderHeader (data) {
        this._eventBus.triggerEvent('checkAuth', data);
    }

    _onLoadAvatarResponse (data) {
        if (!data.avatar) {
            data.avatar = 'default-avatar.svg';
        }

        super.render(null, data);

        if (data.isAuth) {
            let avatar = this.el.querySelector('.header-bar__avatar');

            avatar.style.backgroundImage = `url(${data.avatar})`;
            const avatarRect = avatar.getBoundingClientRect();
            avatar.style.backgroundSize = `${avatarRect.width}px ${avatarRect.height}px`;

            let signoutButton = this.el.querySelector('.header-bar__button-signout');
            signoutButton.addEventListener('click', () => {
                this._eventBus.triggerEvent('signout');
            });
        }
    }

    _onAuthResponse (data) {
        if (data.isAuth == null) {
            console.log('No isAuth param');
            super.render(null);
            return;
        }

        this._eventBus.triggerEvent('loadAvatar', data);
    }
}
