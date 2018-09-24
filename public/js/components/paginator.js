// 1 2 3, 5
const nope = () => null;
export default class Paginator {
    constructor({pagesCount, linksCount, clickCallback = nope, styleClassCurrent, styleClassOther} = {}) {
        this._pagesCount = pagesCount;
        this._linksCount = linksCount;
        this._clickCallback = clickCallback;
        this._links = [];
        this._styleClassCurrent = styleClassCurrent;
        this._styleClassOther = styleClassOther;

        this._firstNum = 1;
        this._lastNum = (this._linksCount < this._pagesCount ? this._linksCount : this._pagesCount);

        for (let i = this._firstNum - 1; i < this._lastNum; i++) {
            this._links.push(document.createElement('div'));
            this._links[i].addEventListener('click', this._onLinkClick.bind(this));
            this._links[i].textContent = i + 1;
            if (i === 0) {
                this._links[i].classList.add(this._styleClassCurrent);
            }

            this._links[i].classList.add(this._styleClassOther);

        }
    }

    render(root) {

        // Отменить выделение блока
        root.addEventListener('mousedown', (e) => e.preventDefault());
        this._links.forEach(val => root.appendChild(val));
    }

    _onLinkClick(ev) {
        ev.preventDefault();
        const linkStr = ev.target.textContent;

        if (typeof +linkStr === "number") {
            const linkNum = +linkStr;
            if (linkNum === (this._lastNum + this._firstNum) / 2 || linkNum === 1
                || linkNum === this._pagesCount) {
                this._change(this._firstNum, this._lastNum, linkNum);
            } else if (linkNum > (this._lastNum + this._firstNum) / 2) {
                this._change(this._firstNum + 1, this._lastNum + 1, linkNum);
            } else if (linkNum < (this._lastNum + this._firstNum) / 2) {
                this._change(this._firstNum - 1, this._lastNum - 1, linkNum);
            }
            this._clickCallback(linkNum);
        }
    }

    _change(firstNum, lastNum, current) {
        this._firstNum = firstNum;
        this._lastNum = lastNum;
        this._links.forEach(val => {
            if (firstNum === current) {
                val.classList.add(this._styleClassCurrent);
            } else {
                if (val.classList.contains(this._styleClassCurrent)) {
                    val.classList.remove(this._styleClassCurrent);
                }
            }
            val.textContent = firstNum++;

        })
    }

}