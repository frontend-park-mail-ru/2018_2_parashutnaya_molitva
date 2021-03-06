import View from '../../lib/view.js';
import template from './headerBar.tmpl.xml';
import './header.less';
import Dropdown from '../../components/dropDown/dropDown';
import { HEADER, ROUTER, SERVICE } from '../../lib/eventbus/events';
const onShowDropdownArray = 'rotate(180deg)';
const onCloseDropdownArray = 'rotate(0deg)';

export default class HeaderBarView extends View {
    constructor (eventBus, globalEventBus) {
        super(template, eventBus, globalEventBus);
        this._eventBus.subscribeToEvent(SERVICE.CHECK_AUTH_RESPONSE, this._onAuthResponse.bind(this));
        this._eventBus.subscribeToEvent(SERVICE.SIGNOUT_RESPONSE, this._onAuthResponse.bind(this));
        this._eventBus.subscribeToEvent(SERVICE.LOAD_USER_RESPONSE, this._onLoadAvatarResponse.bind(this));
        this._globalEventBus.subscribeToEvent(HEADER.LOAD, this._onRenderHeader.bind(this));

        this._globalEventBus.subscribeToEvent(HEADER.DISABLE_TITLE, () => {
            this._isTitleDisable = true;
            document.querySelector('.header-bar__label').style.pointerEvents = 'none';
        });

        this._globalEventBus.subscribeToEvent(HEADER.UNDISABLE_TITLE, () => {
            this._isTitleDisable = false;
            document.querySelector('.header-bar__label').style.pointerEvents = 'auto';
        });

        this._dropDown = new Dropdown({ elements: [
            { path: '/profile', textLabel: 'Profile' },
            { path: '/', textLabel: 'Sign out', class: 'js-signout' }
        ] });
    }

    render (root, data = {}) {
        super.render(root, data);
        this._eventBus.triggerEvent(SERVICE.CHECK_AUTH);
    }

    _onRenderHeader (data) {
        this._eventBus.triggerEvent(SERVICE.CHECK_AUTH, data);
    }

    _onLoadAvatarResponse (data) {
        super.render(null, data);
        const dropdownArray = this.el.querySelector('.js-dropdown-array');
        const onShowDropdown = () => dropdownArray.style.transform = onShowDropdownArray;
        const onCloseDropdown = () => dropdownArray.style.transform = onCloseDropdownArray;
        const title = this.el.querySelector('.header-bar__label');
        if (this._isTitleDisable) {
            title.style.pointerEvents = 'none';
        } else {
            title.style.pointerEvents = 'auto';
        }
        if (data.isAuth) {
            this._dropDown.render({
                root: this.el.querySelector('.dropdown'),
                onShowCallback: onShowDropdown,
                onCloseCallback: onCloseDropdown
            });

            let avatar = this.el.querySelector('.header-bar__avatar');
            avatar.style.backgroundImage = `url(${data.user.avatar})`;

            let signoutButton = this.el.querySelector('.js-signout');
            signoutButton.addEventListener('click', () => {
                this._eventBus.triggerEvent(SERVICE.SIGNOUT);
            });
        }
    }

    _onAuthResponse (data) {
        if (data.signout) {
            this._eventBus.triggerEvent(ROUTER.BACK_TO_MENU);
            super.render(null);
            return;
        }
        if (!data.isAuth) {
            super.render(null);
            return;
        }

        this._eventBus.triggerEvent(SERVICE.LOAD_USER, data);
    }
}
