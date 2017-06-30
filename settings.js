exports.dbConfig = {
    database: "Svendborg_Vand",
    server: "PC10082\\SQLEXPRESS",
    driver: "msnodesqlv8",
    options: {
        trustedConnection: true
    }
}

exports.webPort = 8000;
exports.hostName = "127.0.0.1";
exports.httpMsgsFormat = "HTML";


exports.constants = {
  FIdFieldName: 'FID',
  GeomFieldName: 'geom'
}