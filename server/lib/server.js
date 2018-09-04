const http = require('http');

module.exports = class Server {
    constructor(router) {
        this.server = new http.Server((req, res) => {
            try {
                const url = req.url;
                router.on(url, req, res);
            } catch (e) {
                console.log(e.toString());
            }
        })
    }

    listen(port){
        if (!this.server) {
            throw new Error('Server haven\'t been started');
        }
        if (!port) {
            throw new Error('There is no port');
        }

        console.log('Server started at port: ', port);
        this.server.listen(port);
    }
};