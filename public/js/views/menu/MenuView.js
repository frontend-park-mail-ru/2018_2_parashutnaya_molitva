import View from '../../lib/view.js';
import template from './menu.xml';
import UserBlockController from "../../controllers/UserBlockController";

export default class MenuView extends View {
    constructor(eventBus) {
        super(template, eventBus);
        this._eventBus.subscribeToEvent("checkAuthResponse", this._onRenderResponse.bind(this));
        this._eventBus.subscribeToEvent("signoutResponse", this._onRenderResponse.bind(this));

        this._userBlockController = new UserBlockController();
    }

    render(root, data = {}) {
        super.render(root, data);

        // this.el.querySelector(".user");
        this._userBlockController.userBlockView.render(this.el.querySelector(".user"));
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
        signinButton.classList.add("hidden");
        signupButton.classList.add("hidden");

        signoutButton.classList.remove("hidden");

        signoutButton.addEventListener('click', () => {
            this._eventBus.triggerEvent('signout');
        });
    }

    _showUnauthUserMenu({signinButton, signupButton, signoutButton} = {}) {
        signinButton.classList.remove("hidden");
        signupButton.classList.remove("hidden");
        signoutButton.classList.add("hidden");
    }
}
