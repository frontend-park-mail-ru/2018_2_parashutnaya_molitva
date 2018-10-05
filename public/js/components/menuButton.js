const noop = () => null;
const elementClass = 'button menu__button';
export default class MenuButton {
    /**
     * Конструктор кнопки меню
     * @param textLabel текст внутри кнопки
     * @param href
     * @param clickCallback действие при клике на кнопку
     */
    constructor ({ textLabel, href = '', clickCallback = noop } = {}) {
        const element = document.createElement('a');
        element.innerText = textLabel;
        if (href !== '') {
            element.href = href;
        }
        if (clickCallback !== noop) {
            element.addEventListener('click', clickCallback);
        }
        element.className = elementClass;
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
