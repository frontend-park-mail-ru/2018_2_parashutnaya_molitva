import './dropDown.css';

const noop = () => null;
const dropdownJS = "js-dropdown";
const dropdownContentBlockJS = "js-dropdown-content";
const dropdownContentJS ="js-dropdown-content__button";

const dropdownContentBlockStyle = "dropdown-content";
const dropdownContentStyle = "dropdown-content__button";
const dropdownContentBlockActive = "dropdown-content_active";
const dropdownContentActive = "dropdown-content__button_active";

export default class Dropdown {
    constructor({showAnimationInterval = 250, closeAnimationInterval = 250,
                    contentBlockAnimationInterval = 250,
                elements = []} = {}) {

        this._elements = elements;
        this._showAnimationInterval = showAnimationInterval;
        this._closeAnimationInterval = closeAnimationInterval;
        this._contentBlockAnimationInterval = contentBlockAnimationInterval;

        this._dropdownIsClosing = false;

    }

    render({root = null, onShowCallback = noop, onCloseCallback = noop} = {}) {
        this._root = root;
        this._root.classList.add(dropdownJS);

        let dropdownContentHTML = `<div class="${dropdownContentBlockStyle} ${dropdownContentBlockJS}">`;
        this._elements.forEach( (elem) => {
            dropdownContentHTML +=
                `<a href="${elem.path}" class="button ${dropdownContentStyle} ${dropdownContentJS} ${elem.class}">${elem.textLabel}</a>`
        });

        dropdownContentHTML += '</div>';

        this._root.insertAdjacentHTML('beforeend', dropdownContentHTML);

        this._dropdownContentBlock = root.querySelector("." + dropdownContentBlockJS);
        this._dropdownContent = root.querySelectorAll("." + dropdownContentJS);

        this._dropdownIsVisible = false;
        this._isStartedDropdownAnimation = false;

        this._setDropdownDisableCondition(this._closeAnimationInterval, this._contentBlockAnimationInterval);

        this._root.addEventListener("click", () => {
            if (this._dropdownIsVisible) {
                onCloseCallback();
                this._closeDropdown(this._closeAnimationInterval, this._contentBlockAnimationInterval);

            } else if (!this._dropdownIsClosing) {
                onShowCallback();
                this._showDropDown(this._showAnimationInterval);
            }
        });
    }

    _showDropDown(showAnimationInterval) {
        this._dropdownContentBlock.classList.add(dropdownContentBlockActive);
        this._dropdownIsDrawing = true;
        let c = 0;
        setTimeout(function show(interval) {
            if (c >= this._dropdownContent.length) {
                this._dropdownIsDrawing = false;
                this._dropdownIsVisible = true;
                return;
            }

            this._dropdownContent[c].classList.add(dropdownContentActive);
            c++;
            setTimeout(show.bind(this), interval, interval);
        }.bind(this), 0, showAnimationInterval);
    }

    _closeDropdown(closeAnimationInterval, contentBlockAnimationInterval) {
        let c = this._dropdownContent.length - 1;
        this._dropdownIsClosing = true;
        setTimeout(function show(interval){
            if (c < 0 ){
                setTimeout (() => {
                    if (!this._dropdownIsVisible && !this._dropdownIsDrawing) {
                        this._dropdownContentBlock.classList.remove(dropdownContentBlockActive);
                        this._dropdownContent.forEach((el) => {
                            el.classList.remove(dropdownContentActive);
                        });
                        this._dropdownIsClosing = false;
                    }
                }, contentBlockAnimationInterval);
                this._dropdownIsVisible = false;
                return;
            }
            this._dropdownContent[c].classList.remove(dropdownContentActive);
            c--;
            setTimeout(show.bind(this), interval, interval);
        }.bind(this), 0, closeAnimationInterval);
    }

    _setDropdownDisableCondition(closeAnimationInterval, contentBlockAnimationInterval) {
        window.addEventListener('click', (ev) => {
            if (!(ev.target.classList.contains(dropdownJS)) && this._dropdownIsVisible) {
                this._closeDropdown(closeAnimationInterval, contentBlockAnimationInterval);
            }
        });
    }
}