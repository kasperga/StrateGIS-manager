var db = require("../db/dbconnection");
var httpMsgs = require("../core/httpMsgs");
var util = require("util");

exports.getList = function (req, resp) { 
    var url = require('url');
    var url_parts = url.parse(req.url.toLowerCase(), true);
    var query = url_parts.query;
    db.executeSql("select SPECIFIC_NAME as procname from Svendborg_Vand.information_schema.routines where routine_type = 'PROCEDURE'", function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        }
        else {
            if ((query.outputformat && query.outputformat == 'html'))
                httpMsgs.sendHTML(req, resp, data, true, true);
            else
                httpMsgs.sendJson(req, resp, data);
        }
    });
};


exports.get = function (req, resp, procedurename) { 
    var url = require('url');
    var url_parts = url.parse(req.url.toLowerCase(), true);
    var query = url_parts.query;
    db.executeSql(" SELECT " + 
        "REPLACE(P.name, '@', '') AS ParameterName, " + 
        "TYPE_NAME(P.user_type_id) AS ParameterDataType " + 
        "FROM sys.objects AS SO " + 
        "INNER JOIN sys.parameters AS P " + 
        "ON SO.OBJECT_ID = P.OBJECT_ID " + 
        "WHERE SO.OBJECT_ID IN ( SELECT OBJECT_ID " + 
        "FROM sys.objects " + 
        "WHERE TYPE IN ('P','FN') AND SO.Type_Desc = 'SQL_STORED_PROCEDURE' AND SO.name='" + procedurename + "') " + 
        "ORDER BY P.parameter_id", function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        }
        else {
            if ((query.outputformat && query.outputformat == 'html'))
                httpMsgs.send_SPHTML(req, resp, data);
            else
                httpMsgs.sendJson(req, resp, data);
        }
    });
};

exports.execute = function (req, resp, procedureName, reqBody) {  
    try {
        console.log(req.url);
        if (!reqBody) throw new Error("Input not valid");
        var dataRaw = JSON.parse(reqBody);
		
		if(Object.keys(dataRaw).length != 1)
		{
			console.log("Input too long. Expected 1, was: " + dataRaw.length);
            throw new Error("Input not valid");
        }	
		
		var data;
		
		for(index in dataRaw) {
			data = (JSON.parse(index));
		}
        console.dir(data);
        console.log(procedureName);

        if (data) {//add more validations if necessary
            if (!procedureName) throw new Error("no procedure name");
            var sql = "";
			console.log("procedurename: " + procedureName);
            db.executeSP(procedureName, data, function (data, err) {
                if (err) {
                    httpMsgs.show500(req, resp, err);
                }
                else {
                    httpMsgs.send200(req, resp);
                }
            });
        }
        else {
            throw new Error("Input not valid");
        }
    } catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }   
};