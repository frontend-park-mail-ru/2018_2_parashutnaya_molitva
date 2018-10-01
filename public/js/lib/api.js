import Net from "./net.js";


export default class Api {

    static loadUser(user_guid) {
        return Net.doGet({url: `/api/user/${user_guid}`})
            .then(resp => resp.json())

    }

    static checkSession(){
        return Net.doGet({url : "/api/session"})
    }

    static removeSession() {
        Net.doDelete({url: "/api/session"})
            .then(response => {
                if (!response.ok) {
                    throw new Error(`fetch error (url: ${response.url}, status: ${response.status})`);
                }
            })
            .catch(error => console.error(error));
    }

    static signIn({email, password} = {}) {
        return Net.doPost({
            url: '/api/session',
            body: {
                email,
                password,
            }
        })
    }

    static signUp({email, password} = {}) {
        return Net.doPost({
            url: '/api/user',
            body: {
                email,
                password,
            }
        })
    }

    static updateUser({guid, email, password, avatar} = {}){
        return Net.doPut({
            url: `/api/user/${guid}`,
            body : {
                email,
                password,
                avatar,
            }
        })
    }

    static uploadAvatar({avatar} = {}){
        let formData = new FormData();
        formData.append("avatar", avatar);
        return Net.doPostFormData({
            url: '/api/avatar',
            body: formData,
        })
    }
}