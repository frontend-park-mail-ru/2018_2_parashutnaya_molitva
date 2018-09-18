// Мы без роутера, запустим, например, AboutController
import AboutController from './controllers/AboutController';
import ScoreboardController from './controllers/ScoreboardController';
import MenuController from './controllers/MenuController.js';
import Router from './lib/router.js';
import SigninController from "./controllers/SiginController";

document.addEventListener('DOMContentLoaded', () => {
    const pageBody = document.getElementById('pageBody');

    let router = new Router(pageBody);
    const aboutController = new AboutController();
    const scoreboardController = new ScoreboardController();
    const menuController = new MenuController();
    const signinController = new SigninController(router);

    router.add('/about', aboutController.aboutView);
    router.add('/scoreboard', scoreboardController.scoreboardView);
    router.add('/', menuController.menuView);
    router.add('/signin', signinController.signinView);

    router.start();
});