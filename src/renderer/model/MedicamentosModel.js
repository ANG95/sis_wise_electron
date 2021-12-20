const DBcon = require('../helpers/dbConnection');

module.exports = {
  medicament: (idDX) => {
    return new Promise((resolve, reject) => {
      DBcon.query(
        `SELECT * FROM i_atemedicamentos WHERE amed_IdDiagnostico = ${idDX}`,
        (err, results) => {
          if (err) return reject(err);
          return resolve(results);
        }
      );
    });
  },
};
