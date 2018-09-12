const pageBody = document.getElementById('pageBody');

// Мы без роутера, запустим, например, AboutController
import {AboutController} from './controllers/AboutController';
const aboutController = new AboutController();
aboutController.renderPage(pageBody);

// Или scoreBoardController
// import {ScoreboardController} from './controllers/ScoreboardController';
// const scoreboardController = new ScoreboardController();
// scoreboardController.renderPage(pageBody);