var db = require("../db/dbconnection");
var httpMsgs = require("../core/httpMsgs");
var util = require("util");

exports.getList = function (req, resp, edit) { 
    var url = require('url');
    var url_parts = url.parse(req.url.toLowerCase(), true);
    var query = url_parts.query;
    db.executeSql("SELECT * FROM category_definition", function (data, err) {
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
    db.executeSql("SELECT * FROM category_definition WHERE " + fieldname + "=" + fieldvalue, function (data, err) {
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
            if (!data.category_id) throw new Error("Property category_id not found");
            if (!data.layer_name) throw new Error("Property layer_name not found");
            if (!data.output_layer_name) throw new Error("Property output_layer_name not found");
            var sql = "INSERT INTO category_definition (category_id, layer_name, output_layer_name) VALUES ";
            sql += util.format("(%s, '%s', '%s') ", data.category_id, data.layer_name, data.output_layer_name);
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

            var sql = "UPDATE category_definition SET ";
            
            var isDataProvided = false;
            var islayer_nameProvided = false;
            if (data.layer_name) { 
                sql += "layer_name = '" + data.layer_name + "'";
                isDataProvided = true;
                islayer_nameProvided = true;
            }
            if (data.output_layer_name) { 
                if (islayer_nameProvided)
                    sql += ", ";
                sql += "output_layer_name = '" + data.output_layer_name + "'";
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
            var sql = "DELETE FROM category_definition WHERE id=" + data.id;
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


 