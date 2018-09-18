export default class View {
    constructor(template) {
        this.el = document.createElement('div');
        this.template = template;
        this.listeners = new Map();
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

    addListener(name, func) {
        this.listeners.set(name, func);
    }

}
