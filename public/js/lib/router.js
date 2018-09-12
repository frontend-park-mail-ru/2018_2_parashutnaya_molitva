// TODO: Переделать для SPA
// class Router {
//     constructor() {
//         this.routes = new Map();
//     }
//
//     add(route, view) {
//         this.routes.set(route, view);
//     }
//
//     on(routeRaw, req, res) {
//         const route = new Route(routeRaw);
//         const callback = this.routes.get(route.route);
//         if (this.routes.has(route.route)) {
//             callback(req, res);
//             return;
//         }
//
//         throw new Error('No such route! : ' + route.toString());
//     }
// }
//
// export {Router}