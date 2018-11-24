import Net from "./net";

class UserSingleton {
    constructor () {
        this.login = null;
        this.email = null;
        this.score = null;
        this.avatar = null;
        this.guid = null;
    }

    /**
     * Если хотя бы одно поле не задано, то пользователь считается не загруженным.
     * Перед тем как пойти на сервер, нужно проверить есть ли уже пользователь или нет
     */
    checkUser () {
        debugger;
        return !(this.email === null || this.score === null ||
            this.avatar === null || this.guid === null || this.login === null);
    }

    /**
     * Устанавливает значения для юзера, можно тригерить 'setUser' -ом глобального EventBus
     * @param email
     * @param score
     * @param avatar
     * @param guid
     * @param login
     */
    setUser ({ email, score, avatar, guid, login} = {}) {

        this.email = email;
        this.score = score;
        this.avatar = avatar || 'images/default-avatar.svg';
        this.guid = guid;
        this.login = login || "Nouserlogin";
    }

    /**
     * Удаляет данные пользователя
     */
    removeUser () {
        this.email = null;
        this.score = null;
        this.avatar = null;
        this.guid = null;
        this.login = null;
    }
}


export let User = new UserSingleton();
