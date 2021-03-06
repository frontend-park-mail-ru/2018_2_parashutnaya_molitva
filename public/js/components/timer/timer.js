import './timer.less';

const noop = () => null;
const SECOND = 1000;
const TIMER_ACTIVE_CLASS = 'timer_active';

export default class Timer {
    constructor ({ duration = 600, root = null, timerExpireCallback = noop } = {}) {
        this._root = root;
        this._duration = +duration;
        this._current = +duration;
        this._timerExpireCallback = timerExpireCallback;
    }

    stop () {
        clearInterval(this._timerID);
        this._output.classList.remove(TIMER_ACTIVE_CLASS);
    }

    start () {
        this._output.classList.add(TIMER_ACTIVE_CLASS);
        this._update({ current: this._formatSecondToTime({ seconds: this._current-- }) });
        this._timerID = setInterval(() => {
            if (this._current < 0) {
                this._timerExpireCallback();
                this.stop();
                return;
            }
            this._update({ current: this._formatSecondToTime({ seconds: this._current-- }) });
        }, SECOND);
    }

    render () {
        this._root.innerHTML = `<div class="timer"></div>`;
        this._output = this._root.querySelector('.timer');
        this._update({ current: this._formatSecondToTime({ seconds: this._duration }) });
    }

    _update ({ current }) {
        this._output.innerHTML = current;
    }

    _formatSecondToTime ({ seconds }) {
        if (typeof seconds !== 'number') {
            return '';
        }

        let minute = ~~(seconds / 60);
        let second = seconds % 60;

        return ('0' + minute).slice(-2) + ':' + ('0' + second).slice(-2);
    }

    set ({ seconds }) {
        console.log(`setting time from ${this._current} to ${seconds} seconds`);
        if (typeof seconds !== 'number') {
            return;
        }
        this._current = seconds;
    }
};
