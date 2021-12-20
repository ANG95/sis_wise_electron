const DBcon = require('../helpers/dbConnection');

module.exports = {
  get: (of, to) => {
    return new Promise((resolve, reject) => {
      DBcon.query(
        `SELECT * FROM i_atencion WHERE ate_FecCrea BETWEEN '${of}' AND '${to}'`,
        (err, results) => {
          if (err) return reject(err);
          return resolve(results);
        }
      );
    });
  },
};
