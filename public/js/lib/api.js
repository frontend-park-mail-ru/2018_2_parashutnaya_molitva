import Net from "./net.js";


export default class Api {

    static loadUser(user_guid) {
        return Net.doGet({url: `/api/user/${user_guid}`})
            .then(resp => resp.json())

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
}