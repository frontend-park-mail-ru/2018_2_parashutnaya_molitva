import MenuButton from '../menuButton/menuButton.js';

export default class Menu {
    /**
     * Компонент меню
     * @param list содержит словари с параметрами кнопок
     */
    constructor (list = []) {
        this._buttonDivs = [];
        list.forEach(button => {
            const buttonDiv = document.createElement('div');
            new MenuButton(button).render(buttonDiv);
            this._buttonDivs.push(buttonDiv);
        });
    }

    /**
     * Вставляет кнопку в root элемент
     * @param root
     */
    render (root) {
        root.innerHTML = '';
        this._buttonDivs.forEach(function (buttonDiv) {
            root.appendChild(buttonDiv);
        });
    }
}
