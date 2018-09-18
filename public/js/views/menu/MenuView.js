import View from '../../lib/view.js';
import template from './menu.xml';

export default class MenuView extends View {
    constructor() {
        super(template)
    }

    render(root, data = {}) {
        super.render(root, data);
        this.listeners.get("render")();
    }

    showAuthUserMenu() {

        let signinButton = this.el.querySelector(".menu__button-signin");
        let signupButton = this.el.querySelector(".menu__button-signup");
        signinButton.classList.add("menu__button-hide");
        signupButton.classList.add("menu__button-hide");

        let signoutButton = this.el.querySelector(".menu__button-signout");
        signoutButton.classList.remove("menu__button-hide");

        signoutButton.addEventListener('click', this.listeners.get('signout'));
    }

    showUnauthUserMenu() {
        let signinButton = this.el.querySelector(".menu__button-signin");
        let signupButton = this.el.querySelector(".menu__button-signup");
        signinButton.classList.remove("menu__button-hide");
        signupButton.classList.remove("menu__button-hide");

        let signoutButton = this.el.querySelector(".menu__button-signout");
        signoutButton.classList.add("menu__button-hide");
        signoutButton.removeEventListener('click', this.listeners.get('signout'));
    }
}
