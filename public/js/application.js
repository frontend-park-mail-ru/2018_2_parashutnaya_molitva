import AboutController from './controllers/AboutController.js';
import ScoreboardController from './controllers/ScoreboardController.js';
import MenuController from './controllers/MenuController.js';
import Router from './lib/router.js';
import ProfileController from './controllers/ProfileController.js';
import SigninController from './controllers/SigninController.js';
import SignupController from './controllers/SignupController.js';
import HeaderBarController from './controllers/HeaderBarController.js';
import NotFoundView from './views/notfound/NotFoundView.js';
import EventBus from './lib/eventbus.js';

document.addEventListener('DOMContentLoaded', () => {
    const page = document.querySelector('#page');
    const main = document.querySelector('.main');
    const header = document.querySelector('.header');

    let router = new Router(page);

    const globalEventBus = new EventBus(['renderHeaderBar']);

    const headerBarController = new HeaderBarController({ globalEventBus });
    headerBarController.headerBarView.render(header);

    const aboutController = new AboutController();
    const scoreboardController = new ScoreboardController();
    const menuController = new MenuController();
    const signinController = new SigninController({ router, globalEventBus });
    const signupContoller = new SignupController({ router, globalEventBus });
    const profilerControlleer = new ProfileController({ router, globalEventBus });

    router.add('/about', main, aboutController.aboutView);
    router.add('/scoreboard', main, scoreboardController.scoreboardView);
    router.add('/signin', main, signinController.signinView);
    router.add('/profile', main, profilerControlleer.signinView);
    router.add('/signup', main, signupContoller.signupView);
    router.add('/', main, menuController.menuView);

    router.setNotFoundView(main, new NotFoundView());

    router.start();
});
