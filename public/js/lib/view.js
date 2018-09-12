class View {
    constructor (template) {
        this.el = document.createElement('div');
        this.template = template
    }
    render(data) {
        this.el.innerHTML = this.template(data);
        return this
    }
    appendTo(node) {
        node.appendChild(this.el);
        return this;
    }
}

export {View}