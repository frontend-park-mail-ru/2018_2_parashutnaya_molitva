const port = 4000;

const path = require('path');
const express = require('express');
const body = require('body-parser');
const debug = require('debug');
const log = debug('*');
const fs = require('fs');
const cookie = require('cookie-parser');
const uuidv4 = require('uuid/v4');
const proxy = require('express-http-proxy');

log('Starting server');
const app = express();
const publicRoot = path.resolve(__dirname, '..', 'public');
const indexPath = path.resolve(__dirname, '../public/index.html');

app.use(express.static(publicRoot));
app.use(cookie());
app.use(body.json());

const scoreboard = {
    pagesCount: 3,
    linksCount: 2,
    lineInPage: 3
};

const scoreboardUsers = [
    {
        'username': 'usernameTest1',
        'score': '1488'
    },
    {
        'username': 'usernameTest2',
        'score': '1488'
    },
    {
        'username': 'usernameTest3',
        'score': '1488'
    },
    {
        'username': 'usernameTest4',
        'score': '1488'
    },
    {
        'username': 'usernameTest5',
        'score': '1488'
    },
    {
        'username': 'usernameTest6',
        'score': '1488'
    },
    {
        'username': 'usernameTest7',
        'score': '1488'
    },
    {
        'username': 'usernameTest8',
        'score': '1488'
    },
    {
        'username': 'usernameTest9',
        'score': '1488'
    },
    {
        'username': 'usernameTest10',
        'score': '1488'
    }
];

app.get('/api/scoreboard/pages/', (req, res) => {
    const page = req.query.page;
    const lines = req.query.lines;
    const first = (page - 1) * lines;
    const last = page * lines >= scoreboardUsers.length ? scoreboardUsers.length : page * lines;
    let data = {
        result: scoreboardUsers.filter((val, index) => {
            if (index >= first && index < last) {
                return val;
            }
        })
    };
    console.log(page);
    res.status(200).json(data);
});

app.get('/api/scoreboard', (req, res) => {
    const lines = req.query.lines;
    if (lines !== undefined) {
        if (lines === 0) {
            res.status(400).json({
                error: 'lines can\'t be equal to 0'
            });
            return;
        }

        const pagesCount = (scoreboardUsers.length / lines ^ 0) + (scoreboard.length % lines === 0 ? 0 : 1);
        res.status(200).json({
            error: '',
            result: {
                pagesCount
            }
        });

        return;
    }

    res.status(400).end();
});

app.get('*', (req, res) => {
    log("index path: ", indexPath);
    fs.readFile(indexPath, {encoding: "utf-8"}, (err, file) => {
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
