import View from '../../lib/view.js';
import template from './menu.xml';
import HeaderBarController from "../../controllers/HeaderBarController";

export default class MenuView extends View {
    constructor(eventBus) {
        super(template, eventBus);

        this._headerBarController = new HeaderBarController();
    }

    render(root, data = {}) {
        super.render(root, data);

        this._headerBarController.headerBarView.render(this.el.querySelector(".user"));
        this._eventBus.triggerEvent("checkAuth");
    }
}
