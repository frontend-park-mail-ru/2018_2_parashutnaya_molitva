const Router = require('../lib/router.js');
const Server = require('../lib/server.js');
const Controller = require('./controller');

let router = new Router();
// views
router.add('/', Controller.menuView);
router.add('/about/', Controller.aboutView);
router.add('/scoreboard/', Controller.scoreboardView);


const chessApp = new Server(router);
module.exports = chessApp;