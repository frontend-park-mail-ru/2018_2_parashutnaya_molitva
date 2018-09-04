
const Route = require('./route.js');

module.exports = class Router {
    constructor(){
        this.routes = new Map();
    }

    add(route, callback){
        this.routes.set(new Route(route).route, callback);
    }

    on(routeRaw, req, res) {
        const route = new Route(routeRaw);
        const callback = this.routes.get(route.route);
        if (callback !== undefined){
            callback(req, res);
            return;
        }

        throw new Error('No such route! : ' + route.toString());
    }
};