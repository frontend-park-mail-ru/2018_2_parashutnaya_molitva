// Мы без роутера, запустим, например, AboutController
import AboutController from './controllers/AboutController';
import ScoreboardController from './controllers/ScoreboardController';
import MenuController from './controllers/MenuController.js';
import Router from './lib/router.js';
import SigninController from "./controllers/SiginController";
import SignupController from "./controllers/SignupController";
import HeaderBarController from "./controllers/HeaderBarController";
import EventBus from "./lib/eventbus";

document.addEventListener('DOMContentLoaded', () => {
    const mainBody = document.querySelector('.main');
    const headerBody = document.querySelector('.header');
    let router = new Router(mainBody);

    const events = [
        'mainRender',
    ];

    const globalEventBus = new EventBus(events);

    const aboutController = new AboutController(globalEventBus);
    const scoreboardController = new ScoreboardController(globalEventBus);
    const menuController = new MenuController(globalEventBus);
    const signinController = new SigninController(router);
    const signupContoller = new SignupController(router);

    const headerBarController = new HeaderBarController();

    globalEventBus.subscribeToEvent('mainRender', () => {
        headerBarController.headerBarView.render(headerBody);
    });

    router.add('/about', aboutController.aboutView);
    router.add('/scoreboard', scoreboardController.scoreboardView);
    router.add('/signin', signinController.signinView);
    router.add('/signup', signupContoller.signupView);
    router.add('/', menuController.menuView);


    router.start();
});
