import AboutController from './controllers/AboutController';
import ScoreboardController from './controllers/ScoreboardController';
import MenuController from './controllers/MenuController.js';
import Router from './lib/router.js';
import SigninController from "./controllers/SiginController";
import SignupController from "./controllers/SignupController";
import HeaderBarController from "./controllers/HeaderBarController";
import NotFoundView from "./views/notfound/NotFoundView";
import EventBus from "./lib/eventbus";

document.addEventListener('DOMContentLoaded', () => {
    const page = document.querySelector('#page');
    const main = document.querySelector('.main');
    const header = document.querySelector('.header');

    let router = new Router(page);

    const globalEventBus = new EventBus(['renderHeaderBar']);

    const headerBarController = new HeaderBarController({globalEventBus});
    headerBarController.headerBarView.render(header);

    const aboutController = new AboutController();
    const scoreboardController = new ScoreboardController();
    const menuController = new MenuController();
    const signinController = new SigninController({router, globalEventBus});
    const signupContoller = new SignupController({router, globalEventBus});


    router.add('/about', main, aboutController.aboutView);
    router.add('/scoreboard', main, scoreboardController.scoreboardView);
    router.add('/signin', main, signinController.signinView);
    router.add('/signup', main, signupContoller.signupView);
    router.add('/', main, menuController.menuView);

    router.setNotFoundView(main, new NotFoundView());

    router.start();
});
