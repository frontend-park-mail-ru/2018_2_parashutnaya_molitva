import View from '../../lib/view.js';
import template from './profile.tmpl.js';

export default class ProfileView extends View {
    constructor ({ eventBus = {} } = {}) {
        super(template, eventBus);
        this._eventBus.subscribeToEvent('checkAuthResponse', this._onCheckAuthResponse.bind(this));
        this._eventBus.subscribeToEvent('loadUserResponse', this._onLoadUserResponse.bind(this));
    }
    render (root, data = {}) {
        this._prevRoot = root;
        this._eventBus.triggerEvent('checkAuth');
    }

    _onCheckAuthResponse(data = {}){
        if (data.error || !data.isAuth){
            this._eventBus.triggerEvent('checkAuthError');
            return;
        }

        this._eventBus.triggerEvent('loadUser', data);
    }

    _onLoadUserResponse(data = {}){
        if (data.error || !data.user) {
            this._eventBus.triggerEvent('checkAuthError');
            return;
        }

        super.render(null, data)
    }
}
