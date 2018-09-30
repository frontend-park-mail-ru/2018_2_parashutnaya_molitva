const port = 4001;

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

//
// app.use('/api/*', proxy('http://localhost:4041/', {
//     proxyReqPathResolver: function (req) {
//         return req.originalUrl;
//     }
// }));


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
    // На продакшене исопльзовать регулярку
    // let re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.{8,})/;
    // return re.test(pass);

    return true;
}

let sessionids = {};
let users = {
    "sinimawath@gmail.com": {
        email: "sinimawath@gmail.com",
        pass: "asd",
        score: 10,
    }
};

const scoreboard = {
    pagesCount: 3,
    linksCount: 2,
    lineInPage: 3,
};

const scoreboardUsers = [
    {
        'username': 'usernameTest1',
        'score': '1488',
    },
    {
        'username': 'usernameTest2',
        'score': '1488',
    },
    {
        'username': 'usernameTest3',
        'score': '1488',
    },
    {
        'username': 'usernameTest4',
        'score': '1488',
    },
    {
        'username': 'usernameTest5',
        'score': '1488',
    },
    {
        'username': 'usernameTest6',
        'score': '1488',
    },
    {
        'username': 'usernameTest7',
        'score': '1488',
    },
    {
        'username': 'usernameTest8',
        'score': '1488',
    },
    {
        'username': 'usernameTest9',
        'score': '1488',
    },
    {
        'username': 'usernameTest10',
        'score': '1488',
    },
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
        }),
    };
    console.log(page);
    res.status(200).json(data);

});

app.get('/api/scoreboard', (req, res) => {
    const lines = req.query.lines;
    if (lines !== undefined) {
        if (lines === 0) {
            res.status(400).json({
                error: 'lines can\'t be equal to 0',
            });
            return;
        }

        const pagesCount = (scoreboardUsers.length / lines ^ 0) + (scoreboard.length % lines === 0 ? 0 : 1);
        res.status(200).json({
            error: '',
            result: {
                pagesCount
            },
        });

        return;
    }

    res.status(400).end();
});


app.post('/api/signin', (req, res) => {
    const email = req.body.email;
    const pass = req.body.pass;

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
    const pass = req.body.pass;

    if (!email) {
        return res.status(401).json({
            result: 'email',
            error: emptyEmailWarning,
        });
    }

    if (!pass) {
        return res.status(401).json({
            result: 'pass',
            error: emptyPasswordWarning,
        });
    }

    if (!validEmail(email)) {
        return res.status(401).json({
            result: 'email',
            error: invalidWarning,
        });
    }

    if (users[email]) {
        return res.status(401).json({
            result: 'email',
            error: existUser,
        });
    }

    console.log(pass);
    if (!validPass(pass)) {
        return res.status(401).json({
            result: 'pass',
            error: invalidPasswordData
        });
    }

    users[email] = {
        email,
        pass,
        score: 10,
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
//
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
