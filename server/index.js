const port = 4000;

const path = require('path');
const express = require('express');
const debug = require('debug');
const log = debug('*');
const fs = require('fs');
const cookie = require('cookie-parser');

log('Starting server');
const app = express();
const publicRoot = path.resolve(__dirname, '..', 'public');
const indexPath = path.resolve(__dirname, '../public/index.html');

app.use(express.static(publicRoot));
app.use(cookie());

app.get('/api/scoreboard', (req, res) => {
    res.json([
        {
            'username': 'usernameTest',
            'score': '1488'
        }
    ]);
});

const emptyWarning = "Email or password is empty";
const invalidWarning = "Email is invalid";

function validEmail(email){
    // RFC 2822. Покрывает 99.99% адресов.
    let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(email).toLowerCase());
}

app.post('/api/signin', (req, res) => {
    const email = req.body.email;
    const pass = req.body.pass;

    if (!pass || !email){
        return res.status(401).json({error : emptyWarning});
    }

    if (validEmail(email)){
        return res.status(401).json({error : invalidWarning});
    }

    res.cookie("sessionid", 1, )
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