import Coord from './coord';

const uciToCoordRowKeys = { '1': 0, '2': 1, '3': 2, '4': 3, '5': 4, '6': 5, '7': 6, '8': 7 };
const uciToCoordColumnKeys = { 'a': 0, 'b': 1, 'c': 2, 'd': 3, 'e': 4, 'f': 5, 'g': 6, 'h': 7 };
const coordToUciRowKeys = { 0: '1', 1: '2', 2: '3', 3: '4', 4: '5', 5: '6', 6: '7', 7: '8' };
const coordToUciColumnKeys = { 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e', 5: 'f', 6: 'g', 7: 'h' };

export default class Utils {
    /**
     * translates `uci` to Coord
     * @param {string} uci
     * @return {Coord[]}
     */
    static ucisToCoords (uci) {
        const fromC = uciToCoordColumnKeys[uci[0]];
        const fromR = uciToCoordRowKeys[uci[1]];
        const from = new Coord(fromR, fromC);

        const toC = uciToCoordColumnKeys[uci[2]];
        const toR = uciToCoordRowKeys[uci[3]];
        const to = new Coord(toR, toC);

        return [from, to];
    }

    /**
     * translates `from` and `to` to uci
     * @param from
     * @param to
     * @return {string}
     */
    static coordsToUcis (from, to) {
        let result = '';
        result += coordToUciColumnKeys[from.c];
        result += coordToUciRowKeys[from.r];
        result += coordToUciColumnKeys[to.c];
        result += coordToUciRowKeys[to.r];

        return result;
    }
}
