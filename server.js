/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global  require */

(function () {
    "use strict";

    var http = require("http"),
        fs   = require("fs"),
        path = require("path");

    http.createServer(function (request, response) {
        var filename = '.' + request.url;
        if (filename === './') {
            filename = './index.html';
        }

        var contentType = "text/plain";
        switch (path.extname(filename)) {
        case ".html":
            contentType = "text/html";
            break;
        case ".css":
            contentType = "text/css";
            break;
        case ".js":
            contentType = "application/javascript";
            break;
        case ".json":
            contentType = "application/json";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".gif":
            contentType = "image/gif";
            break;
        case ".ico":
            contentType = "image/x-icon";
            break;
        }

        fs.exists(filename, function (exists) {
            if (exists) {
                fs.readFile(filename, function (error, content) {
                    if (error) {
                        response.writeHead(500);
                        response.end();
                    } else {
                        response.writeHead(200, { 'Content-Type': contentType });
                        response.end(content, 'utf-8');
                    }
                });
            } else {
                response.writeHead(404);
                response.end();
            }
        });

    }).listen(8125);

    console.log('Server running at http://127.0.0.1:8125/');

}());