import View from '../../lib/view';
import template from '../signup/signup.tmpl.xml';
import Game from '../../lib/chess/game';

export default class SingleplayerView extends View {
    constructor ({ eventBus = {} } = {}) {
        super(template, eventBus);
    }

    render (root, data = {}) {
        super.render(root, data);
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
