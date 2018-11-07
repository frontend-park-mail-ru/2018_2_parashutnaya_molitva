import View from '../../lib/view';
import template from './singleplayer.tmpl.xml';
import Game from '../../lib/chess/game';
import Board from '../../components/chess/board';

export default class SingleplayerView extends View {
    constructor ({ eventBus = {} } = {}) {
        super(template, eventBus);
    }

    render (root, data = {}) {
        super.render(root, data);

        const singlePlayerElement = this.el.querySelector('.singleplayer');
        const board = new Board();
        board.render(singlePlayerElement);

        const game = new Game();
        game.printBoard();
        game.printLegalMoves();

        while (!game.isGameOver()) {
            try {
                const input = prompt('your move (open console)');
                game.move(input);
                game.printBoard();
                game.printLegalMoves();
            } catch (e) {
                console.error(e);
                if (e.message === 'null is illegal') {
                    break;
                }
            }
        }
    }
}
