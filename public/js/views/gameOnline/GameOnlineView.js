import template from './gameOnline.tmpl.xml';
import View from "../../lib/view";
export default class GameOnlineView extends View{
    constructor({eventBus = {}} = {}){
        super(template, eventBus);

        this._eventBus.subscribeToEvent('turn', this._onTurn.bind(this))
    }

    render(root, data = {}){
        super.render(root, data);
        this._output = this.el.querySelector(".js-output");
        this._input = this.el.querySelector(".js-input");
        this.el.querySelector('.js-button').addEventListener('click', () => {
            this._eventBus.triggerEvent('sendTurn', {turn: this._input.value});
        });

    }

    _onTurn(data){
        if (!data.turn){
            console.log('Invalid data');
            return;
        }

        this._output.innerHTML = data.turn;
    }
}