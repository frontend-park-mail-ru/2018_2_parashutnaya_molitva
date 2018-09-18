export default class SignupModel {
    signup(callback, data) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/signup", true);
        xhr.withCredentials = true;

        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) {
                return;
            }

            callback(xhr)
        };

        xhr.send(JSON.stringify(data))

    }
}