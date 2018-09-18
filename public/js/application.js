// Мы без роутера, запустим, например, AboutController
import AboutController from './controllers/AboutController';
import ScoreboardController from './controllers/ScoreboardController';
import MenuController from './controllers/MenuController.js';
import Router from './lib/router.js';
import SigninController from "./controllers/SiginController";
import SignupController from "./controllers/SignupController";

document.addEventListener('DOMContentLoaded', () => {
    const pageBody = document.getElementById('pageBody');

    let router = new Router(pageBody);
    const aboutController = new AboutController();
    const scoreboardController = new ScoreboardController();
    const menuController = new MenuController();
    const signinController = new SigninController(router);
    const signupContoller = new SignupController(router);

    router.add('/about', aboutController.aboutView);
    router.add('/scoreboard', scoreboardController.scoreboardView);
    router.add('/signin', signinController.signinView);
    router.add('/signup', signupContoller.signupView);
    router.add('/', menuController.menuView);


    router.start();
});