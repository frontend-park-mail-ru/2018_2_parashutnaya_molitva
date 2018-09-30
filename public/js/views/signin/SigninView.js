import View from '../../lib/view.js';

// import template from './signin.tmpl.xml';

import template from './signin.tmpl.js';

export default class SigninView extends View {
    constructor ({ eventBus = {} } = {}) {
        super(template, eventBus);
        this._eventBus.subscribeToEvent('signinResponse', this._onSubmitResponse.bind(this));
    }

    render (root, data) {
        super.render(root, data);
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
        const field = data.field;
        const error = data.error;
        if (error && field) {
            this.showWarning(error);
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
