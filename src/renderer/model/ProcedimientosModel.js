const DBcon = require('../helpers/dbConnection');

module.exports = {
  getProcedures: (idDX) => {
    return new Promise((resolve, reject) => {
      DBcon.query(
        `SELECT *  FROM i_ateprocedimientos WHERE apro_IdDiagnostico = ${idDX}`,
        (err, results) => {
          if (err) return reject(err);
          return resolve(results);
        }
      );
    });
  },
};
