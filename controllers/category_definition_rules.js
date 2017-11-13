var db = require("../db/dbconnection");
var httpMsgs = require("../core/httpMsgs");
var util = require("util");

exports.getList = function (req, resp, edit) { 
    var url = require('url');
    var url_parts = url.parse(req.url.toLowerCase(), true);
    var query = url_parts.query;
    db.executeSql("SELECT category_definition_rules.id, category_definition_rules.category_definition_id,category_definition_rules.rules_id,category_definition_rules.rule_argument1,category_definition_rules.rule_argument2,rules.rule_name,category_definition.layer_name,category_definition.output_layer_name FROM category_definition_rules INNER JOIN rules on category_definition_rules.rules_id = rules.id INNER JOIN category_definition on category_definition_rules.category_definition_id = category_definition.id", 
    function (data, err) {
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
    db.executeSql("SELECT * FROM category_definition_rules WHERE " + fieldname + "=" + fieldvalue, function (data, err) {
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
            if (!data.category_definition_id) throw new Error("Property category_definition_id not found");
            if (!data.rules_id) throw new Error("Property rules_id not found");
            if (!data.rule_argument1) throw new Error("Property rule_argument1 not found");
            //if (!data.rule_argument2) throw new Error("Property rule_argument2 not found");
            var sql = "INSERT INTO category_definition_rules (category_definition_id, rules_id, rule_argument1, rule_argument2) VALUES ";
			
			if (!data.rule_argument2)
			{
				sql += util.format("(%s, '%s', '%s', %s) ", data.category_definition_id, data.rules_id, data.rule_argument1, data.rule_argument2); //insert null as argument 2
			}
			else
			{
				sql += util.format("(%s, '%s', '%s', '%s') ", data.category_definition_id, data.rules_id, data.rule_argument1, data.rule_argument2); //insert normally
			}
            
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

            var sql = "UPDATE category_definition_rules SET ";
            
            var isDataProvided = false;
            var isrule_argument1Provided = false;

            if (typeof data.rule_argument1 !== 'undefined') { 
                sql += "rule_argument1 = '" + data.rule_argument1 + "'";
                isDataProvided = true;
                isrule_argument1Provided = true;
            }
            if (data.rule_argument2) { 
                if (isrule_argument1Provided)
                    sql += ", ";
                sql += "rule_argument2 = '" + data.rule_argument2 + "'";
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
            var sql = "DELETE FROM category_definition_rules WHERE id=" + data.id;
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


 
