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
import User from './lib/user.js';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import '../css/style.css';
import MultiplayerController from "./controllers/MultiplayerController";

document.addEventListener('DOMContentLoaded', () => {
    if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost')) {
        const registration = runtime.register();
    }
    const page = document.querySelector('#page');
    const main = document.querySelector('.main');
    const header = document.querySelector('header');

    let router = new Router(page);

    const globalEventBus = new EventBus(['renderHeaderBar', 'setUser', 'removeUser',
        'checkUser', 'checkUserResponse']);

    const headerBarController = new HeaderBarController({ globalEventBus });
    headerBarController.headerBarView.render(header);

    let user = new User(globalEventBus);

    const aboutController = new AboutController();
    const scoreboardController = new ScoreboardController();
    const menuController = new MenuController();
    const signinController = new SigninController({ router, globalEventBus });
    const signupContoller = new SignupController({ router, globalEventBus });
    const profilerControlleer = new ProfileController({ router, globalEventBus });
    const multiplayerController = new MultiplayerController({root: main});

    router.add('/about', main, aboutController.aboutView);
    router.add('/scoreboard', main, scoreboardController.scoreboardView);
    router.add('/signin', main, signinController.signinView);
    router.add('/profile', main, profilerControlleer.profileView);
    router.add('/signup', main, signupContoller.signupView);
    router.add('/', main, menuController.menuView);
    router.add('/multiplayer', main, multiplayerController.multiplayerView);

    router.setNotFoundView(main, new NotFoundView());

    router.start();
});
