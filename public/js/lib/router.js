export default class Router {
    constructor(root) {
        this.root = root;
        this.routes = new Map();
    }

    add(path, view) {
        this.routes.set(path, view);
    }

    change(path){
        if (this.routes.has(path)){
            let view = this.routes.get(path);
            view.render(this.root);
        }
        // TODO: Add default 404 View
    }

    start() {
        this.root.addEventListener('click', (ev) => {
            if (ev.target.tagName === 'A') {
                this.change(ev.target.pathname);
            }
        });

        this.change(window.location.pathname)
    }
}