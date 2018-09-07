const Route = require('./route.js');
const servePublic = require('./servePublic.js');

module.exports = class Router {
    constructor() {
        this.routes = new Map();
    }

    add(route, callback) {
        this.routes.set(new Route(route).route, callback);
    }

    on(routeRaw, req, res) {
        if (servePublic.serveIfPublic(routeRaw, req, res)) {
            return;
        }

        const route = new Route(routeRaw);
        const callback = this.routes.get(route.route);
        if (this.routes.has(route.route)) {
            callback(req, res);
            return;
        }

        throw new Error('No such route! : ' + route.toString());
    }
};