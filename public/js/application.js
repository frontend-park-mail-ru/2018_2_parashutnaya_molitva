// Мы без роутера, запустим, например, AboutController
import AboutController from './controllers/AboutController';
import ScoreboardController from './controllers/ScoreboardController';
import MenuController from './controllers/MenuController.js';
import Router from './lib/router.js';

document.addEventListener('DOMContentLoaded', () => {
    const pageBody = document.getElementById('pageBody');

    const aboutController = new AboutController();
    const scoreboardController = new ScoreboardController();
    const menuController = new MenuController();

    let router = new Router(pageBody);

    router.add('/about', aboutController.aboutView);
    router.add('/scoreboard', scoreboardController.scoreboardView);
    router.add('/', menuController.menuView);

    router.start();
});
// Или scoreBoardController

// const scoreboardController = new ScoreboardController();
// scoreboardController.renderPage(pageBody);