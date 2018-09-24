const noop = () => null;
export default class Net {
    static doPost({url = '/', body = {}} = {}) {
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            credentials : "include",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            }
        });
    }

    static doGet({url = '/'} = {}) {
        return fetch(url, {
            method: 'GET',
            credentials : "include",
        });
    }

}