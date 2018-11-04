import { PIECE_TYPE, PIECE_COLOR } from './enums';
import Piece from './piece';
import Coord from './coord';

export default class Board {
    /**
     * constructor
     */
    constructor () {
        /**
         * field with pieces
         * @type {[Piece[]]}
         * @private
         */
        this._field = [
            [Piece.rw(), Piece.nw(), Piece.bw(), Piece.qw(), Piece.kw(), Piece.bw(), Piece.nw(), Piece.rw()],
            [Piece.pw(), Piece.pw(), Piece.pw(), Piece.pw(), Piece.pw(), Piece.pw(), Piece.pw(), Piece.pw()],
            [Piece.em(), Piece.em(), Piece.em(), Piece.em(), Piece.em(), Piece.em(), Piece.em(), Piece.em()],
            [Piece.em(), Piece.em(), Piece.em(), Piece.em(), Piece.em(), Piece.em(), Piece.em(), Piece.em()],
            [Piece.em(), Piece.em(), Piece.em(), Piece.em(), Piece.em(), Piece.em(), Piece.em(), Piece.em()],
            [Piece.em(), Piece.em(), Piece.em(), Piece.em(), Piece.em(), Piece.em(), Piece.em(), Piece.em()],
            [Piece.pb(), Piece.pb(), Piece.pb(), Piece.pb(), Piece.pb(), Piece.pb(), Piece.pb(), Piece.pb()],
            [Piece.rb(), Piece.nb(), Piece.bb(), Piece.qb(), Piece.kb(), Piece.bb(), Piece.nb(), Piece.rb()]
        ];
    }

    /**
     * board copy
     * @returns {Board}
     */
    copy () {
        let copied = new Board();
        let field = new Array(8);
        for (let i = 0; i < 8; i++) {
            let row = new Array(8);
            for (let j = 0; j < 8; j++) {
                row[j] = (this._field[i][j].copy());
            }
            field[i] = row;
        }
        copied._field = field;
        return copied;
    }

    /**
     * moves piece from `from` to `to`
     * @param {Coord} from
     * @param {Coord} to
     */
    movePiece (from, to) {
        this._field[to.r()][to.c()] = this._field[from.r()][from.c()];
        this._field[to.r()][to.c()].setMoved(true);
        this._field[from.r()][from.c()] = Piece.em();
    }

    /**
     * piece at coord
     * @param {Coord} pos
     * @return {Piece}
     */
    pieceAt (pos) {
        if (pos.r() < 0 || pos.r() >= 8 || pos.c() < 0 || pos.c() >= 8) {
            return Piece.no();
        }
        return this._field[pos.r()][pos.c()];
    }

    print () {
        let field = '';
        for (let i = 7; i >= 0; i--) {
            let row = '';
            for (let j = 0; j < 8; j++) {
                row += this._field[i][j].shortName();
            }
            field += row + '\n';
        }

        console.log(field);
    }
}
