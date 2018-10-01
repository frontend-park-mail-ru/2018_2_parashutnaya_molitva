export default class User {
    constructor(globalEventBus) {
        this.email = null;
        this.score = null;
        this.avatar = null;
        this.guid = null;

        this._globalEventBus = globalEventBus;

        this._globalEventBus.subscribeToEvent('setUser', this.setUser.bind(this));
        this._globalEventBus.subscribeToEvent('removeUser', this.removeUser.bind(this));
        this._globalEventBus.subscribeToEvent('checkUser', this.checkUser.bind(this));
    }

    /**
     * Если хотя бы одно поле не задано, то пользователь считается не загруженным.
     * Перед тем как пойти на сервер, нужно проверить есть ли уже пользователь или нет
     */
    checkUser() {
        let isUpload = true;
        if (this.email === null || this.score === null
            || this.avatar === null || this.guid === null) {
            isUpload = false;
        }

        this._globalEventBus.triggerEvent('checkUserResponse', {
            isUpload, user: {
                email : this.email,
                score : this.score,
                avatar : this.avatar,
                guid : this.guid,
            }
        });

    }

    /**
     * Устанавливает значения для юзера, можно тригерить 'setUser' -ом глобального EventBus
     * @param email
     * @param score
     * @param avatar
     * @param guid
     */
    setUser({email, score, avatar, guid}) {
        this.email = email;
        this.score = score;
        this.avatar = avatar;
        this.guid = guid;
    }


    /**
     * Удаляет данные пользователя
     */
    removeUser() {
        this.email = null;
        this.score = null;
        this.avatar = null;
        this.guid = null;
    }


}