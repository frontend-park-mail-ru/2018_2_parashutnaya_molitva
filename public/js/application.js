import '../css/style.less';
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
import GameController from "./controllers/GameController";
<<<<<<< 8544d6d7b2fe015788e4bc525c0ff3cbc7f98f56
import ChatController from "./controllers/ChatController";
=======
import {HEADER} from "./lib/eventbus/events";
>>>>>>> <79> fix-score-update

document.addEventListener('DOMContentLoaded', () => {
    if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost')) {
        // const registration = runtime.register();
    }
    const page = document.querySelector('#page');
    createSiteModules(page);
    const main = document.querySelector('.main');
    const header = document.querySelector('header');

    let router = new Router(page);

    const globalEventBus = new EventBus([HEADER.LOAD]);

    const headerBarController = new HeaderBarController({ globalEventBus, router });
    headerBarController.headerBarView.render(header);

    const aboutController = new AboutController();
    const scoreboardController = new ScoreboardController();
    const menuController = new MenuController();
    const signinController = new SigninController({ router, globalEventBus });
    const signupContoller = new SignupController({ router, globalEventBus });
    const profileControlleer = new ProfileController({ router, globalEventBus });

    const chatController = new ChatController({router});
    const gameController = new GameController({router, globalEventBus});

    router.add('/about', main, aboutController.aboutView);
    router.add('/scoreboard', main, scoreboardController.scoreboardView);
    router.add('/signin', main, signinController.signinView);
    router.add('/profile', main, profileControlleer.profileView);
    router.add('/signup', main, signupContoller.signupView);
    router.add('/', main, menuController.menuView);
    router.add('/multiplayer', main, gameController.multiplayerView);
    router.add('/singleplayer', main, gameController.singleplayerView);
    router.add('/chat', main, chatController.chatView);

    router.setNotFoundView(main, new NotFoundView());

    router.start();
});

function createSiteModules(root) {
    root.innerHTML = `<header class="header"></header>
<main class="main"></main>`
}
