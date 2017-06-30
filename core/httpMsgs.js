var settings = require("../settings");

exports.showHome = function (req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(200, { "Content-Type": "text/html" });
        resp.write("<html><html><head><title>Reserved</title></head><body>This service is reserved to REST actions.</body></html>");
    } else {
        resp.writeHead(200, "Valid EndPoints", { "Content-Type": "application/json" });
        resp.write(JSON.stringify([{ url: "/employees", operation: "GET", description: "To List all Employees" }]));
    } 
    resp.end();
}

exports.options = function (req, resp) { 
        resp.writeHead(204, "No Content", { "Content-Type": "text/html" });
        resp.end();
}


exports.show500 = function (req, resp, err) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(500, "Internal Error occurred", { "Content-Type": "text/html" });
        resp.write("<html><html><head><title>500</title></head><body>500: Internal Error. Details: " + err + "</body></html>");
    } else {
        resp.writeHead(500, "Internal Error occurred", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "ERROR occurred: " + err }));
    }
    
    resp.end();
};

exports.show404 = function (req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(404, "Resource Not Found", { "Content-Type": "text/html" });
        resp.write("<html><html><head><title>404</title></head><body>404: Resource not found. Go to <a href='/'>Home</a></body></html>");
    } else {
        resp.writeHead(404, "Resource not found", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "Resource not found." }));
    } 
    resp.end();
};

exports.show405 = function (req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(405, "Method not supported", { "Content-Type": "text/html" });
        resp.write("<html><html><head><title>405</title></head><body>405: Method not supported</body></html>");
    } else {
        resp.writeHead(405, "Method not supported", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "Method not supported." }));
    }
    
    resp.end();
};

exports.show413 = function (req, resp) {
    if (settings.httpMsgsFormat === "HTML") {
        resp.writeHead(413, "Request Entity Too Large", { "Content-Type": "text/html" });
        resp.write("<html><html><head><title>413</title></head><body>413: Request Entity Too Large.</body></html>");
    } else {
        resp.writeHead(413, "Request Entity Too Large", { "Content-Type": "application/json" });
        resp.write(JSON.stringify({ data: "Request Entity Too Large" }));
    }
    resp.end();
};

exports.send200 = function (req, resp, data) {
    resp.writeHead(200, { "Content-Type": "application/json" });
    resp.end();
};

exports.sendJson = function (req, resp, data) {
    resp.writeHead(200, { "Content-Type": "application/json" });
    if(data) resp.write(JSON.stringify(data, null, 4));    
    resp.end();
};

exports.sendHTML = function (req, resp, data, edit, isStoredProcedure) {
    resp.writeHead(200, { "Content-Type": "text/html" });
    var baseurl = req.url.split("?")[0];
    var urlArr = baseurl.split("/");
    var header = "/";
    
    for (var i = 1; i < urlArr.length; i++) {
        if (urlArr[i].trim().length > 0) {
            if (i == 1) {
                header = urlArr[i].trim().toLowerCase();
                break;
            }
        }
    }
    resp.write('<html>');
    resp.write('<head>');
    resp.write('<link rel="stylesheet" type="text/css" href="/html/styling/style.css">');
    resp.write('<script type="application/javascript" src="/html/js/editor.js"></script>');
    resp.write('<title>' + header.toUpperCase() + '</title>');
    resp.write('</head>');
    resp.write('<body>');
    resp.write('<h1>' + (edit == true ? "EDIT - " : "") + header.toUpperCase() + '</h1>');
    resp.write('<table>');

    // create table headers
    var jsonarray = Object.keys(data.recordsets[0]);    
    resp.write('<thead>');
    // find keys to set table header
    for(var jsonidx in jsonarray) {
        var array = Object.keys(data.recordsets[0][jsonidx]);    
        for(var idx in array) {
            var key = array[idx];
            resp.write('<th>' + key.toUpperCase() + '</th>');
        }
        break;
    }
    if (edit) {
        if (isStoredProcedure) {
            resp.write('<th>Execute</th>');
        } else {
            resp.write('<th>Update</th>');
            resp.write('<th>Delete</th>');
        }
    }
    resp.write('</thead>');

    // create table contents
    // find values to set table body
    resp.write('<tbody>');
    for(var jsonidx in jsonarray) {
        resp.write('<tr>');
        var array = Object.keys(data.recordsets[0][jsonidx]); 
        var keys = ""; 

        var id = -1;
        for(var idx in array) {
            var key = array[idx];
            var value = data.recordsets[0][jsonidx][key];
            keys += (keys.length > 0? "," : "") + key;
            if (edit && idx > 0) {
                if (key.indexOf("_id") < 0) { // fields with '_id' are not editable
                    resp.write('<td><input type="text" id="' + id + "_" + key + '" value="' + value + '"</td>');
                } else {
                    resp.write('<td>' + value + '</td>');
                }
            } else {
                resp.write('<td>' + value + '</td>');
                id = value;
            }
        }
        if (edit) {
            if (isStoredProcedure) {
                resp.write('<td><a href=sp/' + id + '?outputformat=html>Execute</a></td>');
            } else {
                resp.write('<td><a href="javascript:updateItem(' + id + ', \'' + keys + '\')">Update</a></td>');
                resp.write('<td><a href="javascript:deleteItem(' + id + ')">Delete</a></td>');
            }
        }
        resp.write('</tr>');
    }
    resp.write('</tbody>');
    resp.write('</table>');
    resp.write('<br>');
    resp.write('<hr>');
    resp.write('<a href=/>home</a>');
    resp.write('&nbsp;');
    if (edit) {
        resp.write('edit');
        resp.write('&nbsp;');
        resp.write('<a href="javascript:window.history.back();">back</a>');
    } else {
        resp.write('<a href=' + req.url.split("?")[0] + '/edit>edit</a>');        
    }
    resp.write('&nbsp;');
    resp.write('<a href=' + req.url.split("?")[0] + '>json</a>');
    
    resp.end('</body></html>');
};


exports.send_SPHTML = function (req, resp, data) {
    resp.writeHead(200, { "Content-Type": "text/html" });
    var baseurl = req.url.split("?")[0];
    var urlArr = baseurl.split("/");
    var header = "/";
    
    for (var i = 1; i < urlArr.length; i++) {
        if (urlArr[i].trim().length > 0) {
            if (i == 2) {
                header = urlArr[i].trim().toLowerCase();
                break;
            }
        }
    }
    resp.write('<html>');
    resp.write('<head>');
    resp.write('<link rel="stylesheet" type="text/css" href="/html/styling/style.css">');
    resp.write('<script type="application/javascript" src="/html/js/editor.js"></script>');
    resp.write('<title>' + header.toUpperCase() + '</title>');
    resp.write('</head>');
    resp.write('<body>');
    resp.write('<h1>EXECUTE - ' + header.toUpperCase() + '</h1>');
    resp.write('<table>');

    // create table headers
    var array = Object.keys(data.recordsets[0]);    
    for(var i = 0; i < array.length; i++) {
        resp.write('<th>Parameter ' + (i + 1) + '</th>');
    }
    resp.write('<th>Execute</th>');
    resp.write('</thead>');

    // create table contents
    // find values to set table body
    resp.write('<tbody>');
    resp.write('<tr>');

    var array = Object.keys(data.recordsets[0]);
    var keys = "";
    for(var idx in array) {
        console.dir(data.recordsets[0][idx]);
        var key = data.recordsets[0][idx].ParameterName;//array[idx].ParameterName;
        keys += (keys.length > 0 ? "," : "") + key;
        var jstype = "";
        switch(data.recordsets[0][idx].ParameterDataType) {
            case "nvarchar": 
                jstype = "text";
                break;
            case "bit": 
                jstype = "checkbox";
                break;
            case "int": 
                jstype = "number";
                break;
            case "float": 
                jstype = "text";
                break;
            default:
                throw new Error("Unsopprted database datatype: " + data.recordsets[0][idx].ParameterDataType);
        }
        resp.write('<td>' + key + ': <input type="' + jstype + '" id="' + key + '" value=""</td>');
    }

    resp.write('<td><a href="javascript:executeSP(\'' + header + '\', \'' + keys + '\');">Execute</a></td>');
    resp.write('</tr>');
    resp.write('</tbody>');
    resp.write('</table>');
    resp.write('<br>');
    resp.write('<hr>');
    resp.write('<a href=/>home</a>');
    resp.write('&nbsp;');
    resp.write('<a href="javascript:window.history.back();">back</a>');
    resp.write('&nbsp;');
    resp.write('<a href=' + req.url.split("?")[0] + '>json</a>');
    
    resp.end('</body></html>');
};

exports.sendJson2 = function (req, resp, data) {
    resp.writeHead(200, { "Content-Type": "application/json" });
    if(data) resp.write( (JSON.stringify(data)).replace('[', '').replace(']', '')     ); // hide the first [ and the last ]
    resp.end();
};


