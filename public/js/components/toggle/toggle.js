import './toggle.less';
const TOGGLE_CLASSES = ['toggle__element'];

export default class Toggle {
    constructor ({ values = [], callBacks = [], classes = [], activeClass = '', disableClass = '' } = {}) {
        this._values = values;
        this._classes = classes;
        this._callBacks = callBacks;
        this._activeClass = activeClass;
        this._disableClass = disableClass;

        this._wrapper = document.createElement('div');
        this._wrapper.classList.add('toggle');
        this._buttons = [];
        this._values.forEach((value, i) => {
            const button = document.createElement('div');
            button.classList.add(...[...this._classes, ...TOGGLE_CLASSES]);
            if (i === 0) {
                button.classList.add(activeClass);
            } else {
                button.classList.add(disableClass);
            }

            button.innerText = value;
            button.addEventListener('click', () => {
                this._update({ activeButton: i });
                this._callBacks[i]();
            });
            this._buttons.push(button);
            this._wrapper.appendChild(button);
        });
    }

    _update ({ activeButton }) {
        this._buttons.forEach((btn, i) => {
            if (activeButton === i) {
                btn.classList.add(this._activeClass);
                btn.classList.remove(this._disableClass);
            } else {
                btn.classList.remove(this._activeClass);
                btn.classList.add(this._disableClass);
            }
        });
    }

    render (root) {
        root.innerHTML = '';
        root.appendChild(this._wrapper);
    }
}
