const DBcon = require('../helpers/dbConnection');

module.exports = {
  getAdditions: (idServAdditions) => {
    return new Promise((resolve, reject) => {
      DBcon.query(
        `SELECT *  FROM i_atencionser WHERE ASER_NUMREGATE = ${idServAdditions}`,
        (err, results) => {
          if (err) return reject(err);
          return resolve(results);
        }
      );
    });
  },
};
