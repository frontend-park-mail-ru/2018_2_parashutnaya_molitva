export default class MenuModel {
    checkSession(callback) {
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open("GET", "/api/checkSession", true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) {
                return
            }

            callback(xhr);
        };
        xhr.send();

    }

    removeSession(){
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        xhr.open("GET", "/api/removeSession", true);
        xhr.send();
    }
}