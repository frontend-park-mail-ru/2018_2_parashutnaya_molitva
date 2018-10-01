import { AboutView } from '../views/about/AboutView.js';
import { AboutModel } from '../models/AboutModel.js';

export default class AboutController {
    constructor ({ globalEventBus = {} } = {}) {
        this.aboutView = new AboutView({ globalEventBus });
        this.aboutModel = new AboutModel();
    }
}
