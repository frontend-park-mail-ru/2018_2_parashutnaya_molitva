const port = 4000;

const path = require('path');
const express = require('express');
const body = require('body-parser');
const debug = require('debug');
const log = debug('*');
const fs = require('fs');

log('Starting server');
const app = express();
const projectRoot = path.resolve(__dirname, '..');
const publicRoot = path.resolve(__dirname, '..', 'public');
const indexPath = path.resolve(__dirname, '../public/index.html');

app.use(express.static(publicRoot));
app.use(body.json());
app.get('/sw.js', (req, res) => {
    log('sw.js');
    res.sendFile(publicRoot + "/dist/sw.js")
});

app.get('/chat', (req, res) => {
   res.sendFile(publicRoot + "/chat.html");
});

app.get('*', (req, res) => {
    fs.readFile(indexPath, { encoding: 'utf-8' }, (err, file) => {
        if (err) {
            log(err);
            res.statusCode = 404;
            res.end();
        }
        log('request: index.html');
        res.write(file);
        res.end();
    });
});

app.listen(process.env.PORT || port, function () {
    log(`Server listening port ${process.env.PORT || port}`);
});
