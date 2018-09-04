const Router = require('./lib/router.js');
const Server = require('./lib/server.js');

let router = new Router();
router.add('/', (req, res) => {
    res.write('Good');
    res.end();
});

const server = new Server(router);
server.listen(8080);