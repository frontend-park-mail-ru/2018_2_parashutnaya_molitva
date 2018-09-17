
export default class SigninModel{
    constructor(){
    }

    signin(callback, data){
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/signin", true);
        xhr.withCredentials = true;

        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4){
                return;
            }

            callback(xhr)
        };

        xhr.send(JSON.stringify(data))

    }
}