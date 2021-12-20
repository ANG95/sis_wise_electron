const DBcon = require('../helpers/dbConnection');

module.exports = {
  actPreventives: (idAttention) => {
    return new Promise((resolve, reject) => {
      DBcon.query(
        `SELECT *  FROM i_atesmi WHERE asm_IdAtencion = ${idAttention}`,
        (err, results) => {
          if (err) return reject(err);
          return resolve(results);
        }
      );
    });
  },
};
