import MenuView from '../views/menu/MenuView.js';
import MenuModel from '../models/MenuModel.js';

export default class MenuController {
    constructor() {
        this.menuView = new MenuView();
        this.menuModel = new MenuModel();
        this.menuView.addListener('render', this.onRender.bind(this));
        this.menuView.addListener('signout', this.onSignout.bind(this));
    }

    onRender() {
        this.menuModel.checkSession((xhr)=>{
            if (xhr.status === 200){
                this.menuView.showAuthUserMenu();
            }
        })
    }

    onSignout() {
        this.menuModel.removeSession();
        this.menuView.showUnauthUserMenu();
    }
}

