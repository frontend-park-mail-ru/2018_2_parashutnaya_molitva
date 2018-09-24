import View from '../../lib/view.js';
import template from './menu.xml';
import UserBlockController from "../../controllers/UserBlockController";

export default class MenuView extends View {
    constructor(eventBus) {
        super(template, eventBus);

        this._userBlockController = new UserBlockController();
    }

    render(root, data = {}) {
        super.render(root, data);

        this._userBlockController.userBlockView.render(this.el.querySelector(".user"));
        this._eventBus.triggerEvent("checkAuth");
    }
}
