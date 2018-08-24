var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

var ROOT = `${__dirname}\\public`;

console.log('----== SERVER__STARTED ==----');

http.createServer((req, res) => {
    if (!checkAccess(req)) {
        res.statusCode = 404;
        res.end( 'Page not found' );
        return;
    }

    sendFileSafe(url.parse(req.url, true).pathname, res);

}).listen(3333, '127.0.0.1');


function checkAccess (req) {
    return url.parse(req.url, true).query.secret === '1114';
}


function sendFileSafe(filePath, res) {
    try {
        filePath = decodeURIComponent(filePath);
    } catch(e) {
        res.statusCode = 400;
        res.end('Bad request!');
        return;
    }

    if (~filePath.indexOf('\0')) {
        res.statusCode = 400;
        res.end('Bad request!');
        return;
    }

    // normalize - del unused chars
    filePath = path.normalize(path.join(ROOT, filePath));

    if (filePath.indexOf(ROOT) != 0) {
        res.statusCode = 404;
        res.end('File not found');
        return;
    }

    fs.stat(filePath, function(err, stats) {
        if (err || !stats.isFile()) {
            res.statusCode = 404;
            res.end('File not found');
            return;
        }
    });

    sendFile(filePath, res);
}


// first send index.html after in index.html loaded file_img.jpg
function sendFile(filePath, res) {
    fs.readFile(filePath, function(err, content) {
        if (err) throw err;

        res.setHeader('Content-type', 'charset=utf-8');
        // send bite code content
        res.end(content);
    });
}
