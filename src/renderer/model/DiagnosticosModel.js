const DBcon = require('../helpers/dbConnection');

module.exports = {
  dx: (idAttention) => {
    return new Promise((resolve, reject) => {
      DBcon.query(
        `SELECT *  FROM i_atediagnosticos WHERE adi_IdAtencion = ${idAttention}`,
        (err, results) => {
          if (err) return reject(err);
          return resolve(results);
        }
      );
    });
  },
};
