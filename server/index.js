const port = 4000;

const path = require('path');
const express = require('express');
const debug = require('debug');
const log = debug('*');
const fs = require('fs');

log('Starting server');
const app = express();
const publicRoot = path.resolve(__dirname, '..', 'public');
const indexPath = path.resolve(__dirname, '../public/index.html');

app.use(express.static(publicRoot));

app.get('/api/scoreboard', (req, res) => {
    res.json([
        {
            'username': 'usernameTest',
            'score': '1488'
        }
    ]);
});

app.get('*', (req, res) => {
    fs.readFile(indexPath, {encoding: "utf-8"}, (err, file) => {
        if (err) {
            log(err);
            res.statusCode=404;
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