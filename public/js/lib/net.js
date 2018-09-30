const serverURL = "http://localhost:8080";
const storageURL = serverURL + "/storage/";

export default class Net {
    static doPost({url = '/', body = {}} = {}) {
        return fetch(serverURL + url, {
            method: 'POST',
            body: JSON.stringify(body),
            credentials: "include",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            }
        });
    }


    static doGet({url = '/'} = {}) {
        return fetch(serverURL + url, {
            method: 'GET',
            credentials: "include",
        });
    }

    static doDelete({url = '/', body = {}} = {}) {
        return fetch(serverURL + url, {
            method: 'DELETE',
            credentials: 'include',
        })
    }

    static getServerURL() {
        return serverURL;
    }

    static getStorageURL() {
        return storageURL;
    }

}
