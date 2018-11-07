import Net from './net.js';

const gameAddres = "ws://localhost:8080/api/game/ws";

export default class Api {
    /**
     * Загрузить пользователя по guid
     * @param userGuid
     * @returns {Promise<Response | never>}
     */
    static loadUser (userGuid) {
        return Net.doGet({ url: `/api/user/${userGuid}` })
            .then(resp => resp.json());
    }

    /**
     * Проверяет сессию, response содержит userGuid текущей сессии
     * @returns {Promise<Response>}
     */
    static checkSession () {
        return Net.doGet({ url: '/api/session' });
    }

    /**
     * Удаляет текущую сессию
     */
    static removeSession () {
        Net.doDelete({ url: '/api/session' })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`fetch error (url: ${response.url}, status: ${response.status})`);
                }
            })
            .catch(error => console.error(error));
    }

    /**
     * Авторизует пользователя, response содержит userGuid авторизованного пользователя
     * @param email
     * @param password
     * @returns {Promise<Response>}
     */
    static signIn ({ email, password } = {}) {
        return Net.doPost({
            url: '/api/session',
            body: {
                email,
                password
            }
        });
    }

    /**
     * Регистрирует пользователя
     * @param email
     * @param password
     * @returns {Promise<Response>}
     */
    static signUp ({ email, password } = {}) {
        return Net.doPost({
            url: '/api/user',
            body: {
                email,
                password
            }
        });
    }

    /**
     * Обновляет данный о пользователе
     * @param guid
     * @param email
     * @param password
     * @param avatar
     * @returns {Promise<Response>}
     */
    static updateUser ({ guid, email, password, avatar } = {}) {
        return Net.doPut({
            url: `/api/user/${guid}`,
            body: {
                email,
                password,
                avatar
            }
        });
    }

    /**
     * Загружает на сервер аватар, response - содержит название файла в storage
     * @param avatar
     * @returns {Promise<Response>}
     */
    static uploadAvatar ({ avatar } = {}) {
        let formData = new FormData();
        formData.append('avatar', avatar);
        return Net.doPostFormData({
            url: '/api/avatar',
            body: formData
        });
    }

    /**
     * Возвращает количетво пользователей
     * @returns {Promise<Response>}
     */
    static getUserCount () {
        return Net.doGet({
            url: `/api/user/count`
        });
    }

    /**
     * Возвращает топ пользователей
     * @param limit сколько вернуть пользователей
     * @param offset начиная с какого пользователя
     * @returns {Promise<Response>}
     */
    static getScore ({ limit = 5, offset = 0 } = {}) {
        return Net.doGet({
            url: `/api/user/score/?limit=${limit}&offset=${offset}`
        });
    }

    static findRoom({duration = 5} = {}) {
        return Net.doPost({
            url: `/api/game`,
            body: {
                duration,
            },
        });
    }

    static getGameAddress() {
        return gameAddres;
    }
}
