import View from '../../lib/view.js';
import template from './menu.xml';

export default class MenuView extends View {
    constructor(eventBus) {
        super(template, eventBus);
        this._eventBus.subscribeToEvent("checkAuthResponse", this._onRenderResponse.bind(this));
        this._eventBus.subscribeToEvent("signoutResponse", this._onRenderResponse.bind(this));
    }

    render(root, data = {}) {
        super.render(root, data);
        this._eventBus.triggerEvent("checkAuth");
    }

    _onRenderResponse(data) {
        const isAuth = data.isAuth;
        if (isAuth === undefined || isAuth === null) {
            console.log("No isAuth param");
            return;
        }

        let signinButton = this.el.querySelector(".menu__button-signin");
        let signupButton = this.el.querySelector(".menu__button-signup");
        let signoutButton = this.el.querySelector(".menu__button-signout");

        if (isAuth) {
            this._showAuthUserMenu({signoutButton, signupButton, signinButton});
        } else {
            this._showUnauthUserMenu({signoutButton, signupButton, signinButton});
        }


    }

    _showAuthUserMenu({signinButton, signupButton, signoutButton} = {}) {
        signinButton.classList.add("menu__button-hide");
        signupButton.classList.add("menu__button-hide");

        signoutButton.classList.remove("menu__button-hide");

        signoutButton.addEventListener('click', ()=>{
            this._eventBus.triggerEvent('signout');
        });
    }

    _showUnauthUserMenu({signinButton, signupButton, signoutButton} = {}) {
        signinButton.classList.remove("menu__button-hide");
        signupButton.classList.remove("menu__button-hide");
        signoutButton.classList.add("menu__button-hide");
    }
}
