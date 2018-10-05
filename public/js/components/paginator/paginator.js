import './paginator.css';

const noop = () => null;
export default class Paginator {
    /**
     * Создает пагинатор
     * @param pagesCount сколько всего страниц в пагинаторе
     * @param linksCount сколько кнопок в пагинаторе
     * @param clickCallback действие при клике на кнопку
     * @param styleClassesCurrent стили для кнопки, которая указывает на текущую страницу
     * @param styleClassesOther общие стили для кнопки
     */
    constructor ({ pagesCount, linksCount, clickCallback = noop, styleClassesCurrent = [], styleClassesOther = [] } = {}) {
        this._pagesCount = pagesCount;
        this._linksCount = linksCount;
        this._clickCallback = clickCallback;
        this._links = [];
        this._styleClassesCurrent = styleClassesCurrent;
        this._styleClassesOther = styleClassesOther;

        this._firstNum = 1;
        this._lastNum = (this._linksCount < this._pagesCount ? this._linksCount : this._pagesCount);

        for (let i = this._firstNum - 1; i < this._lastNum; i++) {
            this._links.push(document.createElement('div'));
            this._links[i].addEventListener('click', this._onLinkClick.bind(this));
            this._links[i].textContent = i + 1;
            if (i === 0) {
                this._styleClassesCurrent.forEach(classVal => {
                    this._links[i].classList.add(classVal);
                });
            }

            this._styleClassesOther.forEach(classVal => {
                this._links[i].classList.add(classVal);
            });
        }
    }

    /**
     * Вставляет пагинатор в root элемент
     * @param root
     */
    render (root) {
        root.innerHTML = '';
        // Отменить выделение блока
        root.addEventListener('mousedown', (e) => e.preventDefault());
        this._links.forEach(val => root.appendChild(val));
    }

    _onLinkClick (ev) {
        ev.preventDefault();
        const linkStr = ev.target.textContent;

        if (typeof +linkStr === 'number') {
            const linkNum = +linkStr;

            if (linkNum === (this._lastNum + this._firstNum) / 2 ||
                (linkNum < (1 + this._linksCount) / 2 && this._firstNum === 1) ||
                (linkNum > (this._pagesCount - this._linksCount + this._pagesCount) / 2 &&
                    this._lastNum === this._pagesCount) ||
                linkNum === this._pagesCount) {
                this._change(this._firstNum, this._lastNum, linkNum);
            } else if (linkNum > (this._lastNum + this._firstNum) / 2) {
                this._change(this._firstNum + 1, this._lastNum + 1, linkNum);
            } else if (linkNum < (this._lastNum + this._firstNum) / 2) {
                this._change(this._firstNum - 1, this._lastNum - 1, linkNum);
            }

            this._clickCallback(linkNum);
        }
    }

    _change (firstNum, lastNum, current) {
        this._firstNum = firstNum;
        this._lastNum = (lastNum >= this._pagesCount ? this._pagesCount : lastNum);
        this._links.forEach(val => {
            if (firstNum === current) {
                this._styleClassesCurrent.forEach(classVal => {
                    val.classList.add(classVal);
                });
            } else {
                this._styleClassesCurrent.forEach(classVal => {
                    if (val.classList.contains(classVal)) {
                        val.classList.remove(classVal);
                    }
                });
            }

            val.textContent = firstNum++;
        });
    }
}
