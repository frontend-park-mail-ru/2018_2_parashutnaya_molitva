const fs = require('fs');
const debug = require('debug');
const log = debug('*');

module.exports = {
    serveFile(filePath) {
        return new Promise(function (resolve, reject) {
            fs.readFile(filePath, {encoding: "utf-8"}, (err, file) => {
                if (err) {
                    log(err);
                    reject(err);
                }
                log('request: %s', 'hs');
                resolve(file);
            });
        });
    }
};