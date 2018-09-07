const path = require('path');
const templatePath = path.join(__dirname, 'scoreboard.html');
const functions = require(path.join(process.cwd(), "/server/lib/functions.js"));

module.exports = (req, res) => {
    functions.serveFile(templatePath)
        .then((file) => {
            res.write(file);
            res.end();
        })
        .catch(() => {
            res.statusCode=404;
        });
};