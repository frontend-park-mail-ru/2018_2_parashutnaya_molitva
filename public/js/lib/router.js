export default class Router {
    constructor (root) {
        this.root = root;
        this.routes = new Map();

        this.currentRoute = null;
        this.isCurrentNotFound = false;

        window.addEventListener('popstate', () => {
            const pathname = Router._normalizePath(location.pathname);
            this.change(pathname, false);
        });
    }

    /**
     * Переходит на начальную страницу с путем '/'
     * @param delPrev удаляет из истории Путь из которого сделан переход
     */
    toStartPage (delPrev = false) {
        if (delPrev) {
            window.history.replaceState(null, null, "/");
        }

        this.change('/', !delPrev);
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
     * @param addToHistory добавлять Path в History Api или нет.
     * @private
     */
    change (path, addToHistory = true) {
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

        if (addToHistory){
            window.history.pushState(null, null, path);
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

    /**
     * Удаляет суффикс '/', если path != '/'
     * @param path
     * @returns {string}
     * @private
     */
    static _normalizePath (path) {
        return path.charAt(path.length - 1) === '/' && path !== '/' ? path.slice(0, path.length - 1) : path;
    }

    /**
     * Запускает роутер
     */
    start () {
        this.root.addEventListener('click', (ev) => {
            if (ev.target.tagName === 'A' && ev.target.hostname === location.hostname) {
                ev.preventDefault();
                this.change(Router._normalizePath(ev.target.pathname));
            }
        });

        this.change(Router._normalizePath(window.location.pathname), false);
    }
}
