import './iconsPresenter.less';

export default class IconsPresenter {
    constructor({root = {}} = {}) {
        this._root = root;
    }

    render() {
        this._root.innerHTML = `<div class="icon-presenter"></div>`;
        this._iconPresenter = this._root.querySelector(".icon-presenter");
    }

    add(insertIcon) {
        let icon = document.createElement('div');
        insertIcon.render(icon);
        this._iconPresenter.appendChild(icon);

        icon.classList.add('icon-presenter__icon');
    }
};