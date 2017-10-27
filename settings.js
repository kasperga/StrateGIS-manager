exports.dbConfig = {
    database: "Svendbord_Vand_udv",
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

exports.minWeight = -5;
exports.maxWeight = 5;