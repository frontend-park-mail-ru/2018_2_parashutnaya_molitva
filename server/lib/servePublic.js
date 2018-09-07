const path = require('path');
const fs = require('fs');
const debug = require('debug');
const log = debug('*');
const functions = require('./functions');

module.exports = {
    serveIfPublic(route, req, res) {
        if (route.indexOf('/public/') !== 0)
            return false;

        const filePath = path.join(process.cwd(), route);
        functions.serveFile(filePath)
            .then((file) => {
                res.statusCode = 200;
                res.write(file);
                res.end();
            })
            .catch(() => {
                    res.statusCode = 404;
                }
            );
        return true;
    },
};