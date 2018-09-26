export default class View {
    constructor(template, eventBus, globalEventBus) {
        this.el = document.createElement('div');
        this.template = template;
        this._eventBus = eventBus;
        this._globalEventBus = globalEventBus;
    }

    render(root, data) {
        this.el.innerHTML = this.template(data);
        root.appendChild(this.el);

        return this
    }

    hide(root) {
        root.innerHTML = '';
        return this;
    }

}
