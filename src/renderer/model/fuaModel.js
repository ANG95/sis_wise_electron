const DBcon = require('../helpers/dbConnection');

module.exports = {
  search: (lot, fua) => {
    return new Promise((resolve, reject) => {
      DBcon.query(
        `SELECT * FROM i_atencion WHERE ate_Lote ='${lot}' AND  ate_Numero='${fua}'`,
        (err, results) => {
          if (err) return reject(err);
          return resolve(results);
        }
      );
    });
  },
  searchEESS: (payload) => {
    return new Promise((resolve, reject) => {
      DBcon.query(
        `SELECT * FROM bdsis_maestros.m_eess WHERE ${payload}`,
        (err, results) => {
          if (err) return reject(err);
          return resolve(results);
        }
      );
    });
  },
  searchAffiliate: (affiliate) => {
    return new Promise((resolve, reject) => {
      DBcon.query(
        `SELECT * FROM bdsis_asegurados.m_afiliados WHERE afi_NroFormato ='${affiliate}'`,
        (err, results) => {
          if (err) return reject(err);
          return resolve(results);
        }
      );
    });
  },
  updateFUA: ({
    lot,
    numberFormat,
    date,
    hour,
    idAttention,
    idEESS,
    codRenaes,
  }) => {
    console.log({
      lot,
      numberFormat,
      date,
      hour,
      idAttention,
      idEESS,
      codRenaes,
    });
    return new Promise((resolve, reject) => {
      DBcon.query(
        `UPDATE bdsis_data.i_atencion
          SET
            ate_HoraAte='${hour}',
            ate_FecAte='${date}',
            ate_Numero='${numberFormat}',
            ate_Lote='${lot}',
            ate_IdEESS='${idEESS}',
            ate_renipress='${codRenaes}'
          WHERE
            ate_IdAtencion=${idAttention}`,
        (err, results) => {
          if (err) return reject(err);
          return resolve(results);
        }
      );
    });
  },
};
