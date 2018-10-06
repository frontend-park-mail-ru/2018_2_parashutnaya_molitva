import View from '../../lib/view.js';
import template from './signin.tmpl.xml';

export default class SigninView extends View {
    constructor ({ eventBus = {} } = {}) {
        super(template, eventBus);
        this._eventBus.subscribeToEvent('signinResponse', this._onSubmitResponse.bind(this));
        this._eventBus.subscribeToEvent('loadWaiting', this._onLoadWaiting.bind(this));
    }

    render (root, data) {
        super.render(root, data);

        this._loadingEl = this.el.querySelector('.loading');

        let form = this.el.querySelector('.signin__form');
        this.warning = this.el.querySelector('.signin__warning');
        form.addEventListener('submit', this._onSubmit.bind(this, form));
    }

    _onSubmit (form, ev) {
        ev.preventDefault();
        const data = {
            email: form.elements['email'].value,
            pass: form.elements['password'].value
        };
        this._eventBus.triggerEvent('signin', data);
    }

    _onSubmitResponse (data) {
        this._endLoadWaiting();
        const error = data.error;
        if (error) {
            this.showWarning(error);
        }
    }

    _onLoadWaiting () {
        // Индикатор загрузки появляется только, если загрузка происходит дольше 100 мс
        this._loadingTimeOut = setTimeout(() => this._loadingEl.classList.remove('hidden'), 100);
    }

    _endLoadWaiting () {
        clearTimeout(this._loadingTimeOut);
        if (!this._loadingEl.classList.contains('hidden')) {
            this._loadingEl.classList.add('hidden');
        }
    }

    showWarning (text) {
        this._clearWarning();
        this.warning.innerHTML = `<p>${text}</p>`;
    }

    _clearWarning () {
        this.warning.innerHTML = '';
    }
}
