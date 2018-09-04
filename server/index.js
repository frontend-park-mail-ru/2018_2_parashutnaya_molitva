const http = require('http');

class Route{
    constructor(path){
        this.path = path;
    }

    get route(){
        return this.path;
    }

    toString() {
        return this.path;
    }

}

class Router {
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
}

class Server {
    constructor(router) {
        this.server = new http.Server((req, res) => {
            try {
                const url = req.url;
                router.on(url, req, res);
            } catch (e) {
                console.log(e.toString());
            }
        })
    }

    listen(port){
        if (!this.server) {
            throw new Error('Server haven\'t been started');
        }
        if (!port) {
            throw new Error('There is no port');
        }

        console.log('Server started at port: ', port);
        this.server.listen(port);
    }
}

let router = new Router();
router.add('/', (req, res) => {
    res.write('Good');
    res.end();
});

const server = new Server(router);
server.listen(8080);