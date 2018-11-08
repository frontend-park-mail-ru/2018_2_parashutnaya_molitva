import { COLOR } from './consts';
import './cell.css';

const CELL_CLASS = 'cell';
const WHITE_CLASS = 'cell_white';
const BLACK_CLASS = 'cell_black';

const COLOR_CLASSES = {
    [COLOR.WHITE]: WHITE_CLASS,
    [COLOR.BLACK]: BLACK_CLASS
};

export default class Cell {
    constructor (r, c) {
        this.div = document.createElement('div');
        this.div.classList.add(CELL_CLASS, COLOR_CLASSES[(r + c) % 2 === 0 ? COLOR.BLACK : COLOR.WHITE]);

        // coords to uci
        this.div.id = `${String.fromCharCode('a'.charCodeAt() + c)}${r + 1}`;
        // cell must catch event
        // this.div.addEventListener('click', (event) => { event.preventDefault(); });
    }

    render (root) {
        root.innerHTML = '';
        root.appendChild(this.div);
    }
}
