import {AboutView} from "../views/about/AboutView";
import {AboutModel} from '../models/AboutModel'

class AboutController {
    constructor() {
        this.aboutView = new AboutView();
        this.aboutModel = new AboutModel();
    }
    renderPage(pageBody) {
        this.aboutView.render().appendTo(pageBody);
    }
}

export {AboutController}