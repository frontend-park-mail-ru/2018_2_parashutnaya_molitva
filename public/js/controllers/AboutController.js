import {AboutView} from "../views/about/AboutView";
import {AboutModel} from '../models/AboutModel'

export default class AboutController {
    constructor() {
        this.aboutView = new AboutView();
        this.aboutModel = new AboutModel();
    }
}