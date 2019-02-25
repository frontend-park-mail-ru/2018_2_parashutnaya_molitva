import './signin.less';
import View from '../../lib/view.js';
import template from './signin.tmpl.xml';
import autoBind from '../../lib/autobind';

const MULTI_AUTH = 'Sign in to play online';

export default class SigninView extends View {
    constructor ({ eventBus = {} } = {}) {
        super(template, eventBus);
        autoBind(this, '^_on');
        this._eventBus.subscribeToEvent('signinResponse', this._onSubmitResponse);
        this._eventBus.subscribeToEvent('loadWaiting', this._onLoadWaiting);
    }

    render (root, data) {
        super.render(root, data);

        this._loadingEl = this.el.querySelector('.loading');
        this._title = this.el.querySelector('.js-signin-title');

        let form = this.el.querySelector('.form');
        this.warning = this.el.querySelector('.signin__warning');
        form.addEventListener('submit', this._onSubmit.bind(this, form));

        this._checkRedirect();
    }

    _checkRedirect () {
        if (sessionStorage.getItem('redirect')) {
            switch (sessionStorage.getItem('redirect')) {
            case 'multi':
                this._title.innerHTML = MULTI_AUTH;
                break;
            default:
                this._title.innerHTML = '';
                break;
            }
        }
    }

    _onSubmit (form, ev) {
        ev.preventDefault();
        const data = {
            loginOrEmail: form.elements['login_or_email'].value,
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
        this._loadingEl.classList.add('hidden');
    }

    showWarning (text) {
        this._clearWarning();
        this.warning.innerHTML = `<p>${text}</p>`;
    }

    _clearWarning () {
        this.warning.innerHTML = '';
    }
}
