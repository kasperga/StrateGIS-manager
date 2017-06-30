var fs = require('fs');
var path = require('path');

exports.getInformation = function (req, res) { 
    filePath = path.join('./client/', 'angularClient.html');
    outputformat = 'html';

    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
        if (!err) {
            if (outputformat == 'json') {
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(JSON.stringify(data, null, 4));
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
            }
            res.end();
        } else {
            console.log(err);
        }
    });
};