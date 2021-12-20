const DBcon = require('../helpers/dbConnection');

module.exports = {
  insumos: (idDX) => {
    return new Promise((resolve, reject) => {
      DBcon.query(
        `SELECT * FROM i_ateinsumos WHERE ains_IdDiagnostico = ${idDX}`,
        (err, results) => {
          if (err) return reject(err);
          return resolve(results);
        }
      );
    });
  },
};
