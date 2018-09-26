import View from '../../lib/view.js';
import template from './scoreboard.xml';
import Paginator from "../../components/paginator";

class ScoreboardView extends View {
    constructor(eventBus) {
        super(template, eventBus);
        this._eventBus.subscribeToEvent('loadResponse', this._onLoadResponse.bind(this));
        this._eventBus.subscribeToEvent('loadWaiting', this._onLoadWaiting.bind(this));
        this._eventBus.subscribeToEvent('loadPaginatorResponse', this._onLoadPaginatorResponse.bind(this));
        this._paginator = null;
    }


    render(root, data = {}) {
        super.render(root, data);
        this._loadingEl = this.el.querySelector(".scoreboard__loading");
        this._eventBus.triggerEvent('loadPaginator');
        this._eventBus.triggerEvent('load', {pageNum: 1});

    }

    _onLoadPaginatorResponse(data) {

        if (data.error) {
            console.error(data.error);
            return;
        }

        if (data.result.pagesCount !== undefined && data.result.linksCount !== undefined) {

            const clickCallback = (pageNum) => {
                this._eventBus.triggerEvent('load', {pageNum});
            };

            const root = this.el.querySelector(".paginator");
            this._paginator = new Paginator({
                pagesCount: data.result.pagesCount,
                linksCount: data.result.linksCount,
                clickCallback,
                styleClassesCurrent: ['paginator__link_current'],
                styleClassesOther: ['button'],
            });
            this._paginator.render(root);
        } else {
            console.error("There is no pageCount or linksCount, while creating Paginator");
        }

    }

    _onLoadWaiting() {
        this._loadingEl.classList.remove("hidden");

    }

    _endLoadWaiting() {
        if (!this._loadingEl.classList.contains("hidden")) {
            this._loadingEl.classList.add("hidden");
        }
    }

    _onLoadResponse(data) {
        this._endLoadWaiting();
        const error = data.error;
        if (error) {
            // TODO: on error
            return;
        }

        this.el.innerHTML = this.template({users: data});
        if (this._paginator !== null) {
            this._paginator.render(this.el.querySelector('.paginator'));
        }
    }
}

export {ScoreboardView}