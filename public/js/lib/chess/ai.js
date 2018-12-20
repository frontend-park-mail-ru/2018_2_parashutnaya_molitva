import { PIECE_COLOR } from './enums';

export default class AI {
    static aiMove (game, depth) {
        const legalMoves = game._board.legalMoves(game._turn);
        const legalMovesKeys = Object.keys(legalMoves);

        AI.shuffleMoves(legalMovesKeys);

        let bestScore = game.turn() === PIECE_COLOR.WHITE ? -13337 : 13337;
        let bestMove = game.legalMoves[Math.floor(Math.random() * legalMoves.length)];
        legalMovesKeys.forEach(move => {
            const newBoard = legalMoves[move];
            const newScore = AI.minimaxTreeScore(
                newBoard,
                depth,
                game.turn() === PIECE_COLOR.WHITE ? PIECE_COLOR.BLACK : PIECE_COLOR.WHITE
            );

            if (game.turn() === PIECE_COLOR.WHITE) {
                if (newScore > bestScore) {
                    bestScore = newScore;
                    bestMove = move;
                }
            } else {
                if (newScore < bestScore) {
                    bestScore = newScore;
                    bestMove = move;
                }
            }
        });

        console.log('best move', bestMove);
        return bestMove;
    }

    static minimaxTreeScore (board, depth, color) {
        if (depth === 0) {
            return board.materialSum();
        }

        const legalMoves = board.legalMoves(color);
        const legalMovesKeys = Object.keys(legalMoves);
        let bestScore = color === PIECE_COLOR.WHITE ? -13337 : 13337;
        legalMovesKeys.forEach(move => {
            const newBoard = legalMoves[move];
            const newScore = AI.minimaxTreeScore(
                newBoard,
                depth - 1,
                color === PIECE_COLOR.WHITE ? PIECE_COLOR.BLACK : PIECE_COLOR.WHITE
            );

            bestScore = color === PIECE_COLOR.WHITE ? Math.max(bestScore, newScore) : Math.min(bestScore, newScore);
        });
        return bestScore;
    }

    static shuffleMoves (a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
}
