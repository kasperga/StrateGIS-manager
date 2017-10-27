var db = require("../db/dbconnection");
var httpMsgs = require("../core/httpMsgs");
var util = require("util");
var settings = require("../settings");

exports.get = function (req, resp) { 
    var settingsToSend = new Object();
	settingsToSend.database = settings.dbConfig.database;
	settingsToSend.webPort = settings.webPort;
	settingsToSend.hostName = settings.hostName;
	settingsToSend.minWeight = settings.minWeight;
	settingsToSend.maxWeight = settings.maxWeight;
	
	httpMsgs.sendJson(req, resp, settingsToSend);
};