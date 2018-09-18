const port = 4000;

const path = require('path');
const express = require('express');
const body = require('body-parser');
const debug = require('debug');
const log = debug('*');
const fs = require('fs');
const cookie = require('cookie-parser');
const uuidv4 = require('uuid/v4');

log('Starting server');
const app = express();
const publicRoot = path.resolve(__dirname, '..', 'public');
const indexPath = path.resolve(__dirname, '../public/index.html');

app.use(express.static(publicRoot));
app.use(cookie());
app.use(body.json());


app.get('/api/scoreboard', (req, res) => {
    res.json([
        {
            'username': 'usernameTest',
            'score': '1488'
        }
    ]);
});

const emptyWarning = "Email or password is empty";
const emptyEmailWarning = "Email is empty";
const emptyPasswordWarning = "Password is empty";
const invalidWarning = "Email is invalid";
const invalidPersonalData = "No such user with that Email or Password";
const invalidPasswordData = "Must contain at least 8 characters, 1 number, 1 upper and 1 lowercase";
const existUser = "User with such email already exist";

function validEmail(email) {
    // RFC 2822. Покрывает 99.99% адресов.
    let re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(String(email).toLowerCase());
}

function validPass(pass) {
    let re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return re.test(pass);
}

let sessionids = {};
let users = {
    "sinimawath@gmail.com": {
        email: "sinimawath@gmail.com",
        pass: "asd"
    }
};

app.post('/api/signin', (req, res) => {
    const email = req.body.email;
    const pass = req.body.password;

    if (!email) {
        return res.status(401).json({
            field: "email",
            error: emptyEmailWarning,
        });
    }

    if (!pass) {
        return res.status(401).json({
            field: "pass",
            error: emptyPasswordWarning,
        });
    }

    if (!validEmail(email)) {
        return res.status(401).json({
            field: "email",
            error: invalidWarning,
        });
    }

    if (!users[email] || !(users[email].pass === pass)) {
        return res.status(401).json({
            field: "all",
            error: invalidPersonalData,
        });
    }

    const id = uuidv4();
    sessionids[id] = email;
    res.cookie("sessionid", id, {expires: new Date(Date.now() + 90000)});
    res.status(200);
    res.end();
});


app.post('/api/signup', (req, res) => {
    const email = req.body.email;
    const pass = req.body.email;

    if (!email) {
        return res.status(401).json({email: {error: emptyEmailWarning}});
    }

    if (!pass) {
        return res.status(401).json({pass: {error: emptyPasswordWarning}});
    }

    if (!validEmail(email)) {
        return res.status(401).json({email: {error: invalidWarning}});
    }

    if (users[email]) {
        return res.status(401).json({email: {error: existUser}});
    }

    if (!validPass(pass)) {
        return res.status(401).json({pass: {error: invalidPasswordData}});
    }


    users[email] = {
        email,
        pass
    };

    console.log(users[email].pass);
    const cookie = uuidv4();
    sessionids[cookie] = email;
    res.cookie("sessionid", cookie, {expires: new Date(Date.now() + 900000)});
    res.status(200).end();
});

app.get('/api/checkSession', (req, res) => {
    let cookie = req.cookies['sessionid'];
    let email = sessionids[cookie];
    if (!email || !users[email]) {
        return res.status(401).json({error: "Invalid cookie"});
    }

    res.status(200).end();
});


app.get('/api/removeSession', (req, res) => {
    res.clearCookie('sessionid').status(200).end();
});

app.get('*', (req, res) => {
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