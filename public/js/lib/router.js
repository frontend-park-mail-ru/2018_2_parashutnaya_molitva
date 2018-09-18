import NotFoundView from '../views/notfound/NotFoundView.js';

export default class Router {
    constructor(root) {
        this.root = root;
        this.routes = new Map();
        this.notFoundView = new NotFoundView();
        this.currentRoute = null;
    }

    toStartPage(){
        this._change("/");
    }

    add(path, view) {
        this.routes.set(path, view);
    }

    _change(path){

        if (this.currentRoute === path) {
            return
        }

        if (this.routes.has(path)){

            let currentView = this.routes.get(this.currentRoute) || this.notFoundView;
            currentView.hide(this.root);

            let view = this.routes.get(path);
            view.render(this.root);

            this.currentRoute = path;
        }else {

            let currentView = this.routes.get(this.currentRoute);
            currentView.hide(this.root);

            this.notFoundView.render(this.root);
            this.currentRoute = null;
        }
    }

    static _normalizePath(path){
      return path.charAt(path.length - 1) === '/' && path !== '/' ? path.slice(0, path.length - 1) : path;
    }

    start() {
        this.root.addEventListener('click', (ev) => {
            if (ev.target.tagName === 'A') {
                ev.preventDefault();
                this._change(Router._normalizePath(ev.target.pathname));
            }
        });

        this._change(Router._normalizePath(window.location.pathname));

    }
}