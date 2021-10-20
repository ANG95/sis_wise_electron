/* eslint-disable @typescript-eslint/naming-convention */
import { format } from 'date-fns';

const fuaModel = require('../model/fuaModel');

module.exports = {
  search: async (lot, fua) => {
    let resultFua = await fuaModel.search(lot, fua);
    if (resultFua.length > 0) {
      const { ate_IdEESS, ate_FecAte, ate_HoraAte } = resultFua[0];
      const queryPayload = `pre_IDEESS = '${ate_IdEESS}'`;
      const resutEESS = await fuaModel.searchEESS(queryPayload);
      const { pre_Nombre, pre_CodigoRENAES } = resutEESS[0];
      resultFua = [
        {
          ...resultFua[0],
          ate_renipress: pre_CodigoRENAES,
          nombre_eess: pre_Nombre,
          fecha_dig: format(ate_FecAte, 'yyyy-MM-dd'),
          hora_dig: ate_HoraAte.substring(0, 5),
        },
      ];
    }

    return new Promise((resolve, reject) => {
      try {
        return resolve(resultFua);
      } catch (error) {
        return reject(error);
      }
    });
  },
  searchEESS: (renaes) => {
    return new Promise((resolve, reject) => {
      try {
        const queryPayload = `pre_CodigoRENAES = '${renaes}'`;
        const results = fuaModel.searchEESS(queryPayload);
        return resolve(results);
      } catch (error) {
        return reject(error);
      }
    });
  },

  updateFUA: (fua) => {
    return new Promise((resolve, reject) => {
      try {
        const results = fuaModel.updateFUA(fua);
        return resolve(results);
      } catch (error) {
        return reject(error);
      }
    });
  },
};
