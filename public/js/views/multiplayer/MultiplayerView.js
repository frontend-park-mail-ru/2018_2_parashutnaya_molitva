import View from "../../lib/view";
import template from './multiplayer.tmpl.xml';

export default class MultiplayerView extends View {
    constructor({ eventBus = {} } = {}){
        super(template, eventBus)
    }

    render(root, data = {}){
        super.render(root);

        const select = this.el.querySelector('.js-select');
        const button = this.el.querySelector('button');

        button.addEventListener('click', () => {
            this._eventBus.triggerEvent('findGame', {duration: +select.value});
        });
    }
}
