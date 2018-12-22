import 'normalize.css';
import '../css/style.less';
import '../dist/keras/model.json';
import AboutController from './controllers/AboutController.js';
import ScoreboardController from './controllers/ScoreboardController.js';
import MenuController from './controllers/MenuController.js';
import Router from './lib/router.js';
import ProfileController from './controllers/ProfileController.js';
import SigninController from './controllers/SigninController.js';
import SignupController from './controllers/SignupController.js';
import HeaderBarController from './controllers/HeaderBarController.js';
import NotFoundView from './views/notfound/NotFoundView.js';
import EventBus from './lib/eventbus/eventbus.js';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';
import GameController from './controllers/GameController';

import { CHAT, HEADER, GLOBAL } from './lib/eventbus/events';

document.addEventListener('DOMContentLoaded', () => {
    if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost')) {
        runtime.register();
    }

    console.log('start');
    const page = document.querySelector('.page');
    createSiteModules(page);
    const main = document.querySelector('.main');
    const header = document.querySelector('header');

    let router = new Router(page);

    const globalEventBus = new EventBus([HEADER.LOAD, HEADER.CLOSE, HEADER.UNDISABLE_TITLE, HEADER.DISABLE_TITLE]);

    const headerBarController = new HeaderBarController({ globalEventBus, router });
    headerBarController.headerBarView.render(header);

    const aboutController = new AboutController();
    const scoreboardController = new ScoreboardController();
    const menuController = new MenuController({globalEventBus});
    const signinController = new SigninController({ router, globalEventBus });
    const signupContoller = new SignupController({ router, globalEventBus });
    const profileControlleer = new ProfileController({ router, globalEventBus });
    const gameController = new GameController({ router, globalEventBus });

    router.add('/about', main, aboutController.aboutView);
    router.add('/leaderboard', main, scoreboardController.scoreboardView);
    router.add('/signin', main, signinController.signinView);
    router.add('/profile', main, profileControlleer.profileView);
    router.add('/signup', main, signupContoller.signupView);
    router.add('/', main, menuController.menuView);
    router.add('/multiplayer', main, gameController.multiplayerView);
    router.add('/singleplayer', main, gameController.singleplayerView);

    router.setNotFoundView(main, new NotFoundView());
    router.start();
});

function createSiteModules (root) {
    root.innerHTML = `<header class="header"></header>
<main class="main"></main>
`;
}
