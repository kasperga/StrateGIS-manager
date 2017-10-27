var db = require("../db/dbconnection");
var httpMsgs = require("../core/httpMsgs");
var util = require("util");

exports.getList = function (req, resp, edit) { 
    var url = require('url');
    var url_parts = url.parse(req.url.toLowerCase(), true);
    var query = url_parts.query;
    db.executeSql("SELECT * FROM category", function (data, err) {
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
    db.executeSql("SELECT * FROM category WHERE " + fieldname + "=" + fieldvalue, function (data, err) {
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
            if (!data.category_name) throw new Error("Property category_name not found");
            if (!data.category_output_layer_name) throw new Error("Property category_output_layer_name not found");
            var sql = "INSERT INTO category (category_name, category_output_layer_name, includeInAllCategories) VALUES ";
            sql += util.format("('%s', '%s', '%s') ", data.category_name, data.category_output_layer_name, '1');
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
            if (!data.id) 
			{
				console.log("No id in post data.");
				throw new Error("Id not provided");
			}
            var sql = "UPDATE category SET ";
            
            var isDataProvided = false;
            var iscategory_nameProvided = false;
            if (data.category_name) { 
                sql += "category_name = '" + data.category_name + "'";
                isDataProvided = true;
                iscategory_nameProvided = true;
            }
            if (data.category_output_layer_name) { 
                if (iscategory_nameProvided)
                    sql += ", ";
                sql += "category_output_layer_name = '" + data.category_output_layer_name + "'";
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
            var sql = "DELETE FROM category WHERE id=" + data.id;
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


 