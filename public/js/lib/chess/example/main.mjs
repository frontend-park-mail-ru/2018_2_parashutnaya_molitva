import Board from '../board';
import Utils from '../utils';

var stdin = process.openStdin();

const b = new Board();
b.print();

stdin.addListener('data', function (d) {
    b.movePiece(...Utils.ucisToCoords(d.toString().trim()));
    b.print();
    console.log('you entered: [' +
        d.toString().trim() + ']');
});
