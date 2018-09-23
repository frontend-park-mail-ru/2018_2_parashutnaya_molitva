export default class View {
    constructor(template, eventBus) {
        this.el = document.createElement('div');
        this.template = template;
        this.listeners = new Map();
        this._eventBus = eventBus;
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
