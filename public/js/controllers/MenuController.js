
import MenuView from '../views/menu/MenuView.js';
import MenuModel from '../models/MenuModel.js';

export default class MenuController {
    constructor() {
        this.menuView = new MenuView();
        this.menuModel = new MenuModel();
    }
}

