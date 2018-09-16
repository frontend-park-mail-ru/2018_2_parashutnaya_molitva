export default class View {
    constructor (template) {
        this.el = document.createElement('div');
        this.template = template
    }

    render(root, data) {
        this.el.innerHTML = this.template(data);
        root.appendChild(this.el);
        return this
    }

    hide(root){
        root.innerHTML = '';
        return this;
    }
}
