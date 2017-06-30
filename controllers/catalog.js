var httpMsgs = require("../core/httpMsgs");
var fs = require('fs');
var path = require('path');
var url = require('url');

exports.getInformation = function (req, res) { 
    var url_parts = url.parse(req.url.toLowerCase(), true);
    var query = url_parts.query;
    var filePath = "";

    if (query.outputformat && query.outputformat == 'html') {
        filePath = path.join('./html', 'catalog.html');
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
            if (!err) {
                res.write(data);
                res.end();
            } else {
                console.log(err);
            }
        });
    } else {
        filePath = path.join('./html', 'catalog.json');
        var obj = require('../html/catalog.json');
            httpMsgs.sendJson(req, res, obj);
/*
        fs.readFile(filePath, {encoding: 'utf-8'}, function (err, data) {
            if (err) throw err;
        });
        */
    }

};
