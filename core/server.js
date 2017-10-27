var dbconnection = require('../db/dbconnection');
//var catalog = require("../controllers/catalog");
var angularClient = require("../client/controllers/angularClient");
var category = require("../controllers/category");
var category_definition = require("../controllers/category_definition");
var category_definition_rules = require("../controllers/category_definition_rules");
var rules = require("../controllers/rules");
var procedure = require("../controllers/procedure");
var settings = require("../settings");
var settingsInfo = require("../controllers/settings_info");
const http = require('http');


const server = http.createServer((req, res) => {
    var baseurl = req.url.split("?")[0];
    var urlArr = baseurl.split("/");
    var firstOption = "/";
    var secondOption = null;
    var thirdOption = null;
    
    for (var i = 1; i < urlArr.length; i++) {
        if (urlArr[i].trim().length > 0) {
            if (i == 1) {
                firstOptionOriginal = urlArr[i].trim();
                firstOption = firstOptionOriginal.toLowerCase();
            } if (i == 2) {
                secondOptionOriginal = urlArr[i].trim();
                secondOption = secondOptionOriginal.toLowerCase();
            } if (i == 3) {
                thirdOptionOriginal = urlArr[i].trim();
                thirdOption = thirdOptionOriginal.toLowerCase();
			}
        }
    }
    console.log(" --- INCOMING request recieved --- ");    
    console.log("requst method: " + req.method);
    console.log("firstOption: " + firstOption);
    console.log("secondOption: " + secondOption);
    console.log("thirdOption: " + thirdOption);

    var qs = require('querystring');
    var postData = "";
    if (req.method == 'POST') {
        var body = '';

        req.on('data', function (data) {
            body += data;

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });

        req.on('end', function () {
            postJSON = JSON.stringify(qs.parse(body));
            console.dir(postJSON);            
            // switch on first part of url
            switch(firstOption) {
                case "sp":
                    if (secondOption && req.method == "POST")
                        procedure.execute(req, res, secondOptionOriginal, postJSON);
                    break;
                case "category":
                    if (secondOption == "add" && req.method == "POST") {
                        category.add(req, res, postJSON);
                    } else if (secondOption == "update" && req.method == "POST") {
                        category.update(req, res, postJSON);
                    } else if (secondOption == "delete" && req.method == "POST") {
                        category.delete(req, res, postJSON);
                    } else {
                        category.getList(req, res);
                    }
                    break;
                case "category_definition":
                    if (secondOption == "add" && req.method == "POST") {
                        category_definition.add(req, res, postJSON);
                    } else if (secondOption == "update" && req.method == "POST") {
                        category_definition.update(req, res, postJSON);
                    } else if (secondOption == "delete" && req.method == "POST") {
                        category_definition.delete(req, res, postJSON);
                    } else {
                        category_definition.getList(req, res);
                    }
                    break;
                case "rules":
                    if (secondOption == "add" && req.method == "POST") {
                        rules.add(req, res, postJSON);
                    } else if (secondOption == "update" && req.method == "POST") {
                        rules.update(req, res, postJSON);
                    } else if (secondOption == "delete" && req.method == "POST") {
                        rules.delete(req, res, postJSON);
                    } else {
                        rules.getList(req, res);
                    }
                    break;
                case "category_definition_rules":
                    if (secondOption == "add" && req.method == "POST") {
                        category_definition_rules.add(req, res, postJSON);
                    } else if (secondOption == "update" && req.method == "POST") {
                        category_definition_rules.update(req, res, postJSON);
                    } else if (secondOption == "delete" && req.method == "POST") {
                        category_definition_rules.delete(req, res, postJSON);
                    } else {
                        category_definition_rules.getList(req, res);
                    }
                    break;
                default:
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.write("unsupported url: " + req.url);
                    res.end();
            }            
        });
    } 
    if (req.method == 'GET') {
        // switch on first part of url
        switch(firstOption) {
            case "/": 
                angularClient.getInformation(req, res);  
				//catalog.getInformation(req, res);            
                break;
            case "settings":
                settingsInfo.get(req, res);            
                break;	
            case "sp":
                if (secondOption) 
                    procedure.get(req, res, secondOptionOriginal);                            
                //else if (secondOption && thirdOption) 
                  //  procedure.get(req, res, thirdOption);
                else
                    procedure.getList(req, res);            
                break;
            case "category":
                if (secondOption && secondOption == 'edit') 
                    category.getList(req, res, true);                            
                else if (secondOption && thirdOption) 
                    category.get(req, res, secondOptionOriginal, thirdOptionOriginal);            
                else
                    category.getList(req, res, false);            
                break;
            case "category_definition":
                if (secondOption && secondOption == 'edit') 
                    category_definition.getList(req, res, true);                            
                else if (secondOption && thirdOption) 
                    category_definition.get(req, res, secondOptionOriginal, thirdOptionOriginal);            
                else
                    category_definition.getList(req, res, false);            
                break;
            case "rules":
                if (secondOption && secondOption == 'edit') 
                    rules.getList(req, res, true);                            
                else if (secondOption && thirdOption) 
                    rules.get(req, res, secondOptionOriginal, thirdOptionOriginal);            
                else
                    rules.getList(req, res, false);            
                break;
            case "category_definition_rules":
                if (secondOption && secondOption == 'edit') 
                    category_definition_rules.getList(req, res, true);                            
                else if (secondOption && thirdOption) 
                    category_definition_rules.get(req, res, secondOptionOriginal, thirdOptionOriginal);            
                else
                    category_definition_rules.getList(req, res, false);            
                break;
            default:
                if (firstOption && secondOption && thirdOption) {
                    var fs = require('fs');
                    var path = require('path');
                        filePath = path.join(firstOptionOriginal + "/" + secondOptionOriginal, thirdOptionOriginal);
                        console.log("filePath: " + filePath);
                        outputformat = 'html';
						
                        fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data) {
                            if (!err) 
							{
                                if (outputformat == 'json') 
								{
									res.writeHead(200, {'Content-Type': 'application/json'});
									res.write(JSON.stringify(data, null, 4));
								}
								else 
									if(secondOption == 'stylesheets')
									{
										res.writeHead(200, {"Content-Type": "text/css"});
										res.write(data);
									}
									else
									{
										res.writeHead(200, {'Content-Type': 'text/html'});
										res.write(data);
									}
                            res.end();
                            } else {
                                console.log(err);
                            }
                        });
                } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.write("unsupported url: " + req.url);
                    res.end();
                }
            }
    }
    console.log(" --------------------- ");
    
});

server.listen(settings.webPort, settings.hostName, () => {
  console.log(`Server running at http://${settings.hostName}:${settings.webPort}/`);
});
