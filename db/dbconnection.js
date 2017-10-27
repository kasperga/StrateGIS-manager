var sql = require('mssql/msnodesqlv8')
var settings = require("../settings");

//var pool = new sql.ConnectionPool(settings.dbConfig);

exports.executeSql = function (statement, callback) {
    const pool = new sql.ConnectionPool(settings.dbConfig, err => {
        if (err) {
        console.error(err);
        return;
    }        
        var req = new sql.Request(pool);
        req.query(statement).then(function (recordset, err) {
            if (err) {
            console.log("Error in SQL execution.");   
            console.error(err);
            process.exitCode = 1;
            return;            
            }    
            callback(recordset);
        })
    });
    pool.on('error', err => {
        console.log("Error in sql execution.");
        console.log(err);
        callback(null, err);
    });
};




exports.executeSP = function(procedurename, data, callback) {
    console.debug("Inside sp: " + procedurename);
    //const pool = new sql.ConnectionPool(settings.dbConfig).connect().then(function(conn) {
    const pool = new sql.ConnectionPool(settings.dbConfig, err => {
        if (err) {
        console.log("Error with db connection");   
        console.error(err);
        return;
        }         
        var request = new sql.Request(pool);
        switch(procedurename.toLowerCase()) {
            case "sp_calculatelayer":
                console.log("data.OutputTableName: " + data.OutputTableName);
                console.log("data.FeatureClassName: " + data.FeatureClassName);
                console.log("data.FIdFieldName: " + data.FIdFieldName);
                console.log("data.GeomFieldName: " + data.GeomFieldName);
                console.log("data.RecalculateFeatures: " + data.RecalculateFeatures);
                console.log("data.categoryId: " + data.categoryId);
                request.input('OutputTableName', sql.VarChar(30), data.OutputTableName);
                request.input('FeatureClassName', sql.VarChar(30), data.FeatureClassName);
                request.input('FIdFieldName', sql.VarChar(30), data.FIdFieldName);
                request.input('GeomFieldName', sql.VarChar(30), data.GeomFieldName);
                request.input('RecalculateFeatures', sql.Bit, data.OutputTableName);
                request.input('CategoryId', data.categoryId);
            break;
            case "sp_updatecategory":
                console.log("data.CategoryName: " + data.CategoryName);
                request.input('CategoryName', sql.VarChar(30), data.CategoryName);
            break;
            case "sp_updatecategorylayers":
                console.log("data.CategoryName: " + data.CategoryName);
                request.input('CategoryName', sql.VarChar(30), data.CategoryName);
                console.log("data.RecalculateLayers: " + data.RecalculateLayers);
                request.input('RecalculateLayers', sql.Bit, data.RecalculateLayers);                
            break;
            case "sp_updateallcategories":   
            break;
            default: throw new Error("Invalid or unsupported procedure name for StrateGIS Manager: " + procedurename); 
        }
        request.execute(procedurename, (err, recordsets, returnValue, affected) => {
            if (err) {
            console.log("Error running stored procedure.");   
            console.error(err);
            process.exitCode = 1;
            return;            
            }    
            
			console.log("Normal sql execution.");
            callback(recordsets);
        })
    });
    pool.on('error', err => {
        console.log("Error in sp execution.");
        console.log(err);
        callback(null, err);
    });
};