import MenuButton from '../components/menuButton.js';

export default class Menu {
    /**
     * Компонент меню
     * @param list содержит словари с параметрами кнопок
     */
    constructor (list = []) {
        console.log('creating menu');
        this._buttonDivs = [];
        list.forEach(button => {
            console.log(button);
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
        console.log(this._buttonDivs);
        root.innerHTML = '';
        this._buttonDivs.forEach(function (buttonDiv) {
            console.log(buttonDiv);
            root.appendChild(buttonDiv);
        });
    }
}
