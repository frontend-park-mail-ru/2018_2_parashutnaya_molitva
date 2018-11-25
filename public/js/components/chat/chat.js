import './chat.less'

const html = `
<iframe src="/chat" title="iframe example 1" width="400" height="300">
    <p>Your browser does not support iframes.</p>
</iframe>`;

export default class Chat {
    constructor() {
        this.el = document.createElement('div');
        this.el.classList.add("wrapper");
        this.el.innerHTML = html;

    }

    render({root = {}} = {}) {
        root.appendChild(this.el);
    }
}