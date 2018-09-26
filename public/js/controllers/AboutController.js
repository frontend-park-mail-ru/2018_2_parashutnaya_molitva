import {AboutView} from "../views/about/AboutView";
import {AboutModel} from '../models/AboutModel'

export default class AboutController {
    constructor({globalEventBus = {}} = {}) {
        this.aboutView = new AboutView({globalEventBus});
        this.aboutModel = new AboutModel();
    }
}