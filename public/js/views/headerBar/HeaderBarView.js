import View from "../../lib/view";
import template from './headerBar.xml';

export default class HeaderBarView extends View {
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

        if (isAuth) {
            this._loggedIn();
        } else {
            this._loggedOut();
        }
    }

    _loggedIn() {
        let signinButton = this.el.querySelector(".header-bar__button-signin");
        let signupButton = this.el.querySelector(".header-bar__button-signup");
        let signoutButton = this.el.querySelector(".header-bar__button-signout");

        signinButton.classList.add("hidden");
        signupButton.classList.add("hidden");
        signoutButton.classList.remove("hidden");

        signoutButton.addEventListener('click', () => {
            this._eventBus.triggerEvent('signout');
        });
    }

    _loggedOut() {
        let signinButton = this.el.querySelector(".header-bar__button-signin");
        let signupButton = this.el.querySelector(".header-bar__button-signup");
        let signoutButton = this.el.querySelector(".header-bar__button-signout");

        signinButton.classList.remove("hidden");
        signupButton.classList.remove("hidden");
        signoutButton.classList.add("hidden");
    }
}