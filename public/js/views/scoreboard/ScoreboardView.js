import View from '../../lib/view.js';

import template from './scoreboard.tmpl.xml';
import Paginator from '../../components/paginator.js';

class ScoreboardView extends View {
    constructor ({ eventBus = {}, globalEventBus = {} } = {}) {
        super(template, eventBus, globalEventBus);
        this._eventBus.subscribeToEvent('loadResponse', this._onLoadResponse.bind(this));
        this._eventBus.subscribeToEvent('loadWaiting', this._onLoadWaiting.bind(this));
        this._eventBus.subscribeToEvent('loadPaginatorResponse', this._onLoadPaginatorResponse.bind(this));
        this._paginator = null;
        this._isClosed = false;
    }

    render (root, data = {}) {
        super.render(root, data);
        this._initAfterRender();
        this._eventBus.triggerEvent('loadPaginator');
        this._eventBus.triggerEvent('load', { pageNum: 1 });
        this._isClosed = false;
    }

    _onLoadPaginatorResponse (data) {
        if (data.pagesCount !== undefined && data.linksCount !== undefined) {
            const clickCallback = (pageNum) => {
                this._eventBus.triggerEvent('load', { pageNum });
            };

            const root = this.el.querySelector('.paginator');
            this._paginator = new Paginator({
                pagesCount: data.pagesCount,
                linksCount: data.linksCount,
                clickCallback,
                styleClassesCurrent: ['paginator__button_current'],
                styleClassesOther: ['button']
            });
            this._paginator.render(root);
        } else {
            console.error('There is no pageCount or linksCount, while creating Paginator');
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

    _onLoadResponse (data) {
        // При медленном интернете, View могла загрузиться, когда пользователь вернулся в меню
        if (this._isClosed) {
            return;
        }

        this._endLoadWaiting();

        super.render(null, { users: data });

        if (this._paginator !== null) {
            this._paginator.render(this.el.querySelector('.paginator'));
        }

        this._initAfterRender();
    }

    _initAfterRender () {
        this._loadingEl = this.el.querySelector('.loading');
        const backBtn = this.el.querySelector('.button.menu__button');
        backBtn.addEventListener('click', () => { this._isClosed = true; });
    }
}

export { ScoreboardView };
