import './chatMessage.less';

export default class ChatMessage {
    constructor ({ message = '', time = Date.now(), avatarLink = '../../../images/default-avatar.svg', screeenName = 'anonymous' } = {}) {
        this._message = message;
        this._time = new Date(time);
        this._avatarLink = avatarLink;
        this._screenName = screeenName;

        this._div = document.createElement('div');
        this._div.classList.add('chat__message');
        const avatarElement = document.createElement('img');
        avatarElement.setAttribute('src', this._avatarLink);
        avatarElement.setAttribute('alt', 'Avatar');
        this._div.appendChild(avatarElement);

        const messageElement = document.createElement('p');
        messageElement.innerText = this._message;
        this._div.appendChild(messageElement);

        const timeElement = document.createElement('span');
        timeElement.classList.add('time-right');
        timeElement.innerText = this._time.toISOString();
        this._div.appendChild(timeElement);
    }

    render (root) {
        root.innerHTML = '';
        root.appendChild(this._div);
    }

    appendToChat (root) {
        root.appendChild(this._div);
    }
}
