import './promotion-popup.less';
import template from './promotion-popup.xml';
const noop = () => null;

export default class PromotionPopup {
    constructor ({ promotionCallback = noop } = {}) {
        this._promotionCallback = promotionCallback;
    }

    render (root) {
        root.innerHTML = template();

        this._promotionPopup = root.querySelector('.js-promotion-popup');
        this._promotionWhiteFigures = this._promotionPopup.querySelectorAll('.js-white-figure');
        this._promotionBlackFigures = this._promotionPopup.querySelectorAll('.js-black-figure');

        [...this._promotionWhiteFigures, ...this._promotionBlackFigures].forEach((figureElement) => {
            figureElement.addEventListener('click', () => {
                this._promotionCallback({ figure: figureElement.dataset.figure });
                this._closePromotionPopup();
            });
        });
    }

    _showPromotionPopupWhite () {
        this._promotionPopup.classList.remove('hidden');

        this._promotionWhiteFigures.forEach((figure) => {
            figure.classList.remove('hidden');
        });
    }

    _showPromotionPopupBlack () {
        this._promotionPopup.classList.remove('hidden');

        this._promotionBlackFigures.forEach((figure) => {
            figure.classList.remove('hidden');
        });
    }

    _closePromotionPopup () {
        this._promotionPopup.classList.add('hidden');

        [...this._promotionWhiteFigures, ...this._promotionBlackFigures].forEach((figure) => {
            figure.classList.add('hidden');
        });
    }
}
