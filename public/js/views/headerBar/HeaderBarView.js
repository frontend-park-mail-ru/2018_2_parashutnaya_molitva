import View from '../../lib/view.js';
import template from './headerBar.tmpl.xml';
import './header.less';
import Dropdown from "../../components/dropDown/dropDown";
const onShowDropdownArray = "rotate(180deg)";
const onCloseDropdownArray = "rotate(0deg)";

export default class HeaderBarView extends View {
    constructor (eventBus, globalEventBus) {
        super(template, eventBus, globalEventBus);
        this._eventBus.subscribeToEvent('checkAuthResponse', this._onAuthResponse.bind(this));
        this._eventBus.subscribeToEvent('signoutResponse', this._onAuthResponse.bind(this));
        this._eventBus.subscribeToEvent('loadAvatarResponse', this._onLoadAvatarResponse.bind(this));
        this._globalEventBus.subscribeToEvent('renderHeaderBar', this._onRenderHeader.bind(this));

        this._dropDown = new Dropdown({elements: [
                {path: '/profile', textLabel: "Profile"},
                {path: '/', textLabel: "Sign out", class:"js-signout"},
            ]})
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
            data.avatar = 'images/default-avatar.svg';
        }

        super.render(null, data);
        const dropdownArray = this.el.querySelector(".js-dropdown-array");
        const onShowDropdown = () => dropdownArray.style.transform = onShowDropdownArray;
        const onCloseDropdown = () => dropdownArray.style.transform = onCloseDropdownArray;

        if (data.isAuth) {
            this._dropDown.render({
                root : this.el.querySelector(".dropdown"),
                onShowCallback:onShowDropdown,
                onCloseCallback: onCloseDropdown,
            });

            let score = this.el.querySelector('.js-header-score');
            score.innerHTML = data.score;
            let avatar = this.el.querySelector('.header-bar__avatar');

            avatar.style.backgroundImage = `url(${data.avatar})`;

            let signoutButton = this.el.querySelector('.js-signout');
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
