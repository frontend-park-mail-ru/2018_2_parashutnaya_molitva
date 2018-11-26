const serverURLProd = 'https://kekmate.tech';
const serverURLDev = 'http://localhost:8080';

const storageURL = '/storage/';

export default class Net {
    /**
     * Пост запрос, с JSON body
     * @param url
     * @param body
     * @returns {Promise<Response>}
     */
    static doPost ({ url = '/', body = {} } = {}) {
        return fetch(Net.getServerURL() + url, {
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
        return fetch(Net.getServerURL() + url, {
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
        return fetch(Net.getServerURL() + url, {
            method: 'DELETE',
            credentials: 'include'
        });
    }

    /**
     * Возвращает url api server-a
     * @returns {string}
     */
    static getServerURL () {
        if (PRODUCTION) {
            return serverURLProd;
        }
        return serverURLDev;
    }

    /**
     * Возвращает url статики пользователя
     * @returns {string}
     */
    static getStorageURL () {
        if (PRODUCTION) {
            return serverURLProd + storageURL;
        }
        return serverURLDev + storageURL;
    }

    /**
     * Put запрос, с JSON body
     * @param url
     * @param body
     * @returns {Promise<Response>}
     */
    static doPut ({ url = '/', body = {} } = {}) {
        return fetch(Net.getServerURL() + url, {
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
        return fetch(Net.getServerURL() + url, {
            method: 'POST',
            body,
            mode: 'cors',
            credentials: 'include'
        });
    }
}
