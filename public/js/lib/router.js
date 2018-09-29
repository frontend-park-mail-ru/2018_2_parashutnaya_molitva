export default class Router {
    constructor (root) {
        this.root = root;
        this.routes = new Map();

        this.currentRoute = null;
        this.isCurrentNotFound = false;
    }

    /**
     * Переходит на начальную страницу с путем '/'
     */
    toStartPage () {
        this._change('/');
    }

    /**
     * Добавляет маршрут для роутера.
     * @param path путь при переходе на который будет вызвана view
     * @param root элемент куда будет рисоваться view, по-умолчание это this.root
     * @param view компонент, который отрисуется
     */
    add (path, root = this.root, view) {
        this.routes.set(path, {
            root,
            view
        });
    }

    /**
     * Устанавливает View компонент, который будет отрисовываться, если не найден запрашиваемый маршрут
     * @param root элемент куда будет рисоваться view, по-умолчание это this.root
     * @param view компонент, который отрисуется
     */
    setNotFoundView (root = this.root, view) {
        this.notFoundView = view;
        this.notFoundViewRoot = root;
    }

    /**
     * Переход на маршрут с путем path
     * @param path путь
     * @private
     */
    _change (path) {
        if (this.currentRoute === path) {
            return;
        }

        let currentData = this.routes.get(this.currentRoute);
        if (currentData) {
            currentData.view.hide(currentData.root);
        }

        if (this.isCurrentNotFound) {
            this.notFoundView.hide(this.notFoundViewRoot);
        }

        if (this.routes.has(path)) {
            let data = this.routes.get(path);
            data.view.render(data.root);
            this.currentRoute = path;
        } else {
            this.notFoundView.render(this.notFoundViewRoot);
            this.currentRoute = null;
            this.isCurrentNotFound = true;
        }
    }

    static _normalizePath (path) {
        return path.charAt(path.length - 1) === '/' && path !== '/' ? path.slice(0, path.length - 1) : path;
    }

    /**
     * Запускает роутер
     */
    start () {
        this.root.addEventListener('click', (ev) => {
            if (ev.target.tagName === 'A') {
                ev.preventDefault();
                this._change(Router._normalizePath(ev.target.pathname));
            }
        });

        this._change(Router._normalizePath(window.location.pathname));
    }
}
