import { COLOR, PIECE_TYPE } from '../consts';
import './piece.less';

const PIECE_CLASS = 'piece';

const PAWN_CLASS = 'piece_pawn';
const KNIGHT_CLASS = 'piece_knight';
const BISHOP_CLASS = 'piece_bishop';
const ROOK_CLASS = 'piece_rook';
const QUEEN_CLASS = 'piece_queen';
const KING_CLASS = 'piece_king';

const WHITE_CLASS = 'piece_white';
const BLACK_CLASS = 'piece_black';

const PIECE_CLASSES = {
    [PIECE_TYPE.PAWN]: PAWN_CLASS,
    [PIECE_TYPE.KNIGHT]: KNIGHT_CLASS,
    [PIECE_TYPE.BISHOP]: BISHOP_CLASS,
    [PIECE_TYPE.ROOK]: ROOK_CLASS,
    [PIECE_TYPE.QUEEN]: QUEEN_CLASS,
    [PIECE_TYPE.KING]: KING_CLASS
};

const COLOR_CLASSES = {
    [COLOR.WHITE]: WHITE_CLASS,
    [COLOR.BLACK]: BLACK_CLASS
};

export default class Piece {
    constructor (piece, color) {
        this.div = document.createElement('div');
        this.div.classList.add(PIECE_CLASS, PIECE_CLASSES[piece], COLOR_CLASSES[color]);
    }

    render (root) {
        root.innerHTML = '';
        root.appendChild(this.div);
    }

    resize ({ width = 32, height = 32 }) {

    }
}
