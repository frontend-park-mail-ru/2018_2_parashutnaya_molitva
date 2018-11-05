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

    /**
     *  knight moves
     * @param {Board} board
     * @param {Coord} pos
     * @return {{}}
     */
    static knight (board, pos) {
        let availableMoves = {};
        const knight = board.pieceAt(pos);

        const steps = [
            new Coord(-2, 1), new Coord(-1, 2), new Coord(1, 2), new Coord(2, 1),
            new Coord(2, -1), new Coord(1, -2), new Coord(-1, -2), new Coord(-2, -1)
        ];

        steps.forEach(step => {
            const stepAbs = step.add(pos);
            const piece = board.pieceAt(stepAbs);
            if ((piece.color() !== knight.color() && piece.color() !== PIECE_COLOR.NONE) ||
                piece.type() === PIECE_TYPE.EN_PASSANT ||
                piece.type() === PIECE_TYPE.EMPTY) {
                let moveBoard = board.copy();
                moveBoard.movePiece(pos, stepAbs);
                moveBoard.removeEnPassant();

                availableMoves[Utils.coordsToUcis(pos, stepAbs)] = moveBoard;
            }
        });
        return availableMoves;
    }

    /**
     *  bishop moves
     * @param {Board} board
     * @param {Coord} pos
     * @return {{}}
     */
    static bishop (board, pos) {
        let availableMoves = {};
        const bishop = board.pieceAt(pos);

        let steps = [];
        const rMultipliers = [1, 1, -1, -1];
        const cMultipliers = [1, -1, 1, -1];
        for (let i = 0; i < rMultipliers.length; i++) {
            for (let j = 1; j < 8; j++) {
                const stepRel = new Coord(j * rMultipliers[i], j * cMultipliers[i]);
                const stepAbs = stepRel.add(pos);
                const piece = board.pieceAt(stepAbs);
                if (piece.type() === PIECE_TYPE.EMPTY || piece.type() === PIECE_TYPE.EN_PASSANT) {
                    steps.push(stepAbs);
                    continue;
                }
                if (piece.color() === bishop.color() || piece.type() === PIECE_TYPE.NONE) {
                    break;
                }
                if (piece.color() !== bishop.color()) {
                    steps.push(stepAbs);
                    break;
                }
            }
        }

        steps.forEach(stepAbs => {
            let moveBoard = board.copy();
            moveBoard.movePiece(pos, stepAbs);
            moveBoard.removeEnPassant();
            availableMoves[Utils.coordsToUcis(pos, stepAbs)] = moveBoard;
        });
        return availableMoves;
    }

    /**
     * rook moves
     * @param {Board} board
     * @param {Coord} pos
     * @return {{}}
     */
    static rook (board, pos) {
        let availableMoves = {};
        const rook = board.pieceAt(pos);

        let steps = [];
        const rMultipliers = [1, 0, -1, 0];
        const cMultipliers = [0, 1, 0, -1];
        for (let i = 0; i < rMultipliers.length; i++) {
            for (let j = 1; j < 8; j++) {
                const stepRel = new Coord(j * rMultipliers[i], j * cMultipliers[i]);
                const stepAbs = stepRel.add(pos);
                const piece = board.pieceAt(stepAbs);
                if (piece.type() === PIECE_TYPE.EMPTY || piece.type() === PIECE_TYPE.EN_PASSANT) {
                    steps.push(stepAbs);
                    continue;
                }
                if (piece.color() === rook.color() || piece.type() === PIECE_TYPE.NONE) {
                    break;
                }
                if (piece.color() !== rook.color()) {
                    steps.push(stepAbs);
                    break;
                }
            }
        }

        steps.forEach(stepAbs => {
            let moveBoard = board.copy();
            moveBoard.movePiece(pos, stepAbs);
            moveBoard.removeEnPassant();
            availableMoves[Utils.coordsToUcis(pos, stepAbs)] = moveBoard;
        });
        return availableMoves;
    }

    /**
     * queen moves
     * @param {Board} board
     * @param {Coord} pos
     * @return {{}}
     */
    static queen (board, pos) {
        let availableMoves = {};
        availableMoves = Object.assign(availableMoves, this.rook(board, pos));
        availableMoves = Object.assign(availableMoves, this.bishop(board, pos));

        return availableMoves;
    }

    /**
     * king moves
     * @param {Board} board
     * @param {Coord} pos
     * @param {boolean} attackOnly
     */
    static king (board, pos, attackOnly) {
        let availableMoves = {};
        const king = board.pieceAt(pos);

        const steps = [
            new Coord(0, -1), new Coord(1, -1), new Coord(1, 0), new Coord(1, 1),
            new Coord(0, 1), new Coord(-1, 1), new Coord(-1, 0), new Coord(-1, -1)
        ];

        steps.forEach(stepRel => {
            const stepAbs = stepRel.add(pos);
            const piece = board.pieceAt(stepAbs);
            if (piece.type() === PIECE_TYPE.EMPTY || piece.type() === PIECE_TYPE.EN_PASSANT ||
                (piece.color() !== king.color() && piece.type() !== PIECE_TYPE.NONE)) {
                let moveBoard = board.copy();
                moveBoard.movePiece(pos, stepAbs);
                moveBoard.removeEnPassant();
                availableMoves[Utils.coordsToUcis(pos, stepAbs)] = moveBoard;
            }
        });

        return availableMoves;
    }
}
