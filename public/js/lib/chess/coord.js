export default class Coord {
    /**
     * constructor
     * @param {number} r
     * @param {number} c
     */
    constructor (r, c) {
        this._r = r;
        this._c = c;
    }

    /**
     * row getter
     * @returns {number}
     */
    r () {
        return this._r;
    }

    /**
     * column getter
     * @returns {number}
     */
    c () {
        return this._c;
    }

    /**
     * coord addition
     * @param {Coord} other
     * @returns {Coord}
     */
    add (other) {
        return new Coord(this.r() + other.r(), this.c() + other.c());
    }

    /**
     * coord subtraction
     * @param {Coord} other
     * @returns {Coord}
     */
    subtract (other) {
        return new Coord(this.r() - other.r(), this.c() - other.c());
    }

    /**
     * coord multiplication
     * @param {Coord} other
     * @returns {Coord}
     */
    multiply (other) {
        return new Coord(this.r() * other.r(), this.c() * other.c());
    }
}
