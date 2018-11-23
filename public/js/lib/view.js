export default class View {
    constructor (template, eventBus, globalEventBus) {
        this.el = document.createElement('div');
        this.el.classList.add("wrapper");
        this.template = template;
        this._eventBus = eventBus;
        this._globalEventBus = globalEventBus;
        this._prevRoot = null;
    }

    /**
     * Компилирует шаблон в root элемент. Сохраняет последний root в this._prevRoot
     * @param root если root === null, то рендрится в this._prevRoot
     * @param data
     * @returns {View}
     */
    render (root, data = {}) {
        if (root === undefined || root === null) {
            root = this._prevRoot;
        } else {
            this._prevRoot = root;
        }
        this.el.innerHTML = this.template(data);
        root.innerHTML = '';
        root.appendChild(this.el);

        return this;
    }

    hide (root) {
        root.innerHTML = '';
        return this;
    }
}
