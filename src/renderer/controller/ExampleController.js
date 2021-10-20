const userType = require('../model/EjemploModel');

module.exports = {
  get: (of, to) => {
    return new Promise((resolve, reject) => {
      try {
        const results = userType.get(of, to);
        return resolve(results);
      } catch (error) {
        return reject(error);
      }
    });
  },
};
