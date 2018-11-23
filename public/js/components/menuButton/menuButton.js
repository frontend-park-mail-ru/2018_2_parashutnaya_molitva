import './menuButton.less';

const noop = () => null;
const elementClass = 'button menu__button';
const disableClass = 'menu__button_disable';

export default class MenuButton {
    /**
     * Конструктор кнопки меню
     * @param textLabel текст внутри кнопки
     * @param href
     * @param clickCallback действие при клике на кнопку
     */
    constructor ({ textLabel, href = '', clickCallback = noop, isNavigate = true} = {}) {
        const element = document.createElement('a');
        element.innerText = textLabel;
        if (href !== '') {
            element.href = href;
        }else {
            if (isNavigate) {
                element.classList.add(disableClass);
            }
        }
        if (clickCallback !== noop) {
            element.addEventListener('click', clickCallback);
        }

        element.classList.add(...elementClass.split(" "));
        this._element = element;
    }

    /**
     * Вставляет кнопку в root элемент
     * @param root
     */
    render (root) {
        root.innerHTML = '';
        root.appendChild(this._element);
    }
}
