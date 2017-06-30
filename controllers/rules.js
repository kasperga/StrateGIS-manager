var db = require("../db/dbconnection");
var httpMsgs = require("../core/httpMsgs");
var util = require("util");

exports.getList = function (req, resp, edit) { 
    var url = require('url');
    var url_parts = url.parse(req.url.toLowerCase(), true);
    var query = url_parts.query;
    db.executeSql("SELECT * FROM rules", function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        }
        else {
            if (edit || (query.outputformat && query.outputformat == 'html'))
                httpMsgs.sendHTML(req, resp, data, edit);
            else
                httpMsgs.sendJson(req, resp, data);
        }
    });
};


 exports.get = function (req, resp, fieldname, fieldvalue) {  
    db.executeSql("SELECT * FROM rules WHERE " + fieldname + "=" + fieldvalue, function (data, err) {
        if (err) {
            httpMsgs.show500(req, resp, err);
        }
        else {
            httpMsgs.sendJson2(req, resp, data );
        }
    });
};


exports.add = function (req, resp, reqBody) {  
    try {
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
        if (data) {//add more validations if necessary
            if (!data.rule_name) throw new Error("Property rule_name not found");
            var sql = "INSERT INTO rules (rule_name) VALUES ";
            sql += util.format("('%s') ", data.rule_name);
            console.log("sql: " + sql);
            db.executeSql(sql, function (data, err) {
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
    } 
        catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }   
};

exports.update = function (req, resp, reqBody) {  
    try {
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
        if (data) {
            if (!data.id) throw new Error("Id not provided");

            var sql = "UPDATE rules SET ";
            
            var isDataProvided = false;
            if (data.rule_name) { 
                sql += "rule_name = '" + data.rule_name + "'";
                isDataProvided = true;
            }
            if (!isDataProvided) throw new Error("No data provided to update");

            sql += " WHERE id = " + data.id;
            console.log(sql);
            db.executeSql(sql, function (data, err) {
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
    } 
        catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
};

exports.delete = function (req, resp, reqBody) { 
    try {
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
        if (data) {//add more validations if necessary
            if (!data.id) throw new Error("Property id not found");
            var sql = "DELETE FROM rules WHERE id=" + data.id;
            console.log("sql: " + sql);
            db.executeSql(sql, function (data, err) {
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
    } 
    catch (ex) {
        httpMsgs.show500(req, resp, ex);
    }
};


 