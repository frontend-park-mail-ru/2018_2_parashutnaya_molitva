import './chat.less'

const html = `
    ЭТО ЧАТ в IFRAME
    <div class="counter"></div>
`;

export default class Chat {
    constructor() {
        this.el = document.createElement('div');
        this.el.classList.add("wrapper");
        this.el.innerHTML = html;
        let counter =  this.el.querySelector('.counter');
        let c = 0;
        setInterval(() => {
            counter.innerHTML = c++;
        }, 1000);
    }

    render({root = {}} = {}) {
        root.appendChild(this.el);
    }
}