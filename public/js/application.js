// Мы без роутера, запустим, например, AboutController
import AboutController from './controllers/AboutController';
import ScoreboardController from './controllers/ScoreboardController';
import Router from './lib/router.js'

document.addEventListener('DOMContentLoaded', () => {
    const pageBody = document.getElementById('pageBody');

    const aboutController = new AboutController();
    const scoreboardController = new ScoreboardController();
    let router = new Router(pageBody);

    router.add('/about', aboutController.aboutView);
    router.add('/scoreboard', scoreboardController.scoreboardView);
    router.start();
});
// Или scoreBoardController

// const scoreboardController = new ScoreboardController();
// scoreboardController.renderPage(pageBody);