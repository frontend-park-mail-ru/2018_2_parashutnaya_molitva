// const serverURL = 'https://kekmate.tech';
const serverURL = 'http://localhost:8080/';
// const storageURL = serverURL + '/storage/';

export default class Net {
    /**
     * Пост запрос, с JSON body
     * @param url
     * @param body
     * @returns {Promise<Response>}
     */
    static doPost ({ url = '/', body = {} } = {}) {
        return fetch(serverURL + url, {
            method: 'POST',
            body: JSON.stringify(body),
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
    }

    /**
     * Гет запрос
     * @param url
     * @returns {Promise<Response>}
     */
    static doGet ({ url = '/' } = {}) {
        return fetch(serverURL + url, {
            method: 'GET',
            credentials: 'include'
        });
    }

    /**
     * Delete запрос
     * @param url
     * @param body
     * @returns {Promise<Response>}
     */
    static doDelete ({ url = '/', body = {} } = {}) {
        return fetch(serverURL + url, {
            method: 'DELETE',
            credentials: 'include'
        });
    }

    /**
     * Возвращает url api server-a
     * @returns {string}
     */
    static getServerURL () {
        return serverURL;
    }

    /**
     * Возвращает url статики пользователя
     * @returns {string}
     */
    static getStorageURL () {
        return storageURL;
    }

    /**
     * Put запрос, с JSON body
     * @param url
     * @param body
     * @returns {Promise<Response>}
     */
    static doPut ({ url = '/', body = {} } = {}) {
        return fetch(serverURL + url, {
            method: 'PUT',
            body: JSON.stringify(body),
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
    }

    /**
     * Post запрос с multipart form data. Fetch сам выставляет необходимые заголовки
     * @param url
     * @param body
     * @returns {Promise<Response>}
     */
    static doPostFormData ({ url = '/', body = {} } = {}) {
        return fetch(serverURL + url, {
            method: 'POST',
            body,
            mode: 'cors',
            credentials: 'include'
        });
    }
}
