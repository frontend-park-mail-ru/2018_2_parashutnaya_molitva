import { PIECE_TYPE, PIECE_COLOR } from './enums';
import Coord from './coord';
import Utils from './utils';
import Piece from './piece';

const promotionMap = {
    'q': PIECE_TYPE.QUEEN,
    'r': PIECE_TYPE.ROOK,
    'b': PIECE_TYPE.BISHOP,
    'n': PIECE_TYPE.KNIGHT
};

export default class Moves {
    /**
     *  pawn moves
     * @param {Board} board
     * @param {Coord} pos
     * @param {boolean} attackOnly
     * @return {{}}
     */
    static pawn (board, pos, attackOnly) {
        let availableMoves = {};
        const pawn = board.pieceAt(pos);

        const forwardRel = pawn.color() === PIECE_COLOR.WHITE ? new Coord(1, 0) : new Coord(-1, 0);
        const doubleForwardRel = pawn.color() === PIECE_COLOR.WHITE ? new Coord(2, 0) : new Coord(-2, 0);
        const captureRel = pawn.color() === PIECE_COLOR.WHITE ? new Coord(1, 1) : new Coord(-1, 1);
        const enPassantRel = pawn.color() === PIECE_COLOR.WHITE ? new Coord(-1, 0) : new Coord(1, 0);
        const pawnEnPassantRel = pawn.color() === PIECE_COLOR.WHITE ? new Coord(-1, 0) : new Coord(1, 0);

        const forwardAbs = forwardRel.add(pos);
        const doubleForwardAbs = doubleForwardRel.add(pos);
        const enPassantAbs = enPassantRel.add(doubleForwardAbs);

        if (!attackOnly) {
            const pieceAtForward = board.pieceAt(forwardAbs);
            if (pieceAtForward.type() === PIECE_TYPE.EMPTY) {
                const uci = Utils.coordsToUcis(pos, forwardAbs);
                // promotion
                if ((pawn.color() === PIECE_COLOR.WHITE && forwardAbs.r() === 7) ||
                    (pawn.color() === PIECE_COLOR.BLACK && forwardAbs.r() === 0)) {
                    for (const key in promotionMap) {
                        let moveBoard = board.copy();
                        moveBoard.movePiece(pos, forwardAbs);
                        moveBoard.setPieceAt(forwardAbs, new Piece(promotionMap[key], pawn.color()));
                        moveBoard.removeEnPassant();
                        availableMoves[uci + key] = moveBoard;
                    }
                } else {
                    let moveBoard = board.copy();
                    moveBoard.movePiece(pos, forwardAbs);
                    moveBoard.removeEnPassant();
                    availableMoves[uci] = moveBoard;
                }
            }

            const pieceAtDoubleForward = board.pieceAt(doubleForwardAbs);
            if (pieceAtDoubleForward.type() === PIECE_TYPE.EMPTY && !pawn.isMoved()) {
                let moveBoard = board.copy();
                moveBoard.movePiece(pos, doubleForwardAbs);
                moveBoard.removeEnPassant();
                moveBoard.setPieceAt(enPassantAbs, new Piece(PIECE_TYPE.EN_PASSANT, pawn.color()));
                availableMoves[Utils.coordsToUcis(pos, doubleForwardAbs)] = moveBoard;
            }
        }

        const captureMultipliers = [new Coord(1, 1), new Coord(1, -1)];

        captureMultipliers.forEach(m => {
            const captureAbs = captureRel.multiply(m).add(pos);
            const pieceAtCapture = board.pieceAt(captureAbs);

            if (pieceAtCapture.color() !== pawn.color() && pieceAtCapture.color() !== PIECE_COLOR.NONE) {
                const uci = Utils.coordsToUcis(pos, captureAbs);
                // promotion
                if ((pawn.color() === PIECE_COLOR.WHITE && captureAbs.r() === 7) ||
                    (pawn.color() === PIECE_COLOR.BLACK && captureAbs.r() === 0)) {
                    for (const key in promotionMap) {
                        let moveBoard = board.copy();
                        moveBoard.movePiece(pos, captureAbs);
                        moveBoard.setPieceAt(captureAbs, new Piece(promotionMap[key], pawn.color()));
                        moveBoard.removeEnPassant();
                        availableMoves[uci + key] = moveBoard;
                    }
                } else {
                    let moveBoard = board.copy();
                    moveBoard.movePiece(pos, captureAbs);
                    moveBoard.removeEnPassant();
                    if (pieceAtCapture.type() === PIECE_TYPE.EN_PASSANT) {
                        const pawnEnPassantAbs = pawnEnPassantRel.add(captureAbs);
                        moveBoard.setPieceAt(pawnEnPassantAbs, Piece.em());
                    }
                    availableMoves[uci] = moveBoard;
                }
            }
        });

        return availableMoves;
    }
}
