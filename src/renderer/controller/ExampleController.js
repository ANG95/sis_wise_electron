/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/naming-convention */
const userType = require('../model/AtencionesModel');
const actPrevent = require('../model/ActPreventivasModel');
const diagnostics = require('../model/DiagnosticosModel');
const medicaments = require('../model/MedicamentosModel');
const supplies = require('../model/InsumosModel');
const procedures = require('../model/ProcedimientosModel');
const additions = require('../model/AdicionalesModel');

module.exports = {
  get: async (of, to) => {
    const attentions = [];

    const results = await userType.get(of, to);

    await Promise.all(
      results.map(async (a, i) => {
        const { ate_IdAtencion } = a;

        const resultActP = await actPrevent.actPreventives(ate_IdAtencion);
        const resultDX = await diagnostics.dx(ate_IdAtencion);
        const resultAdditions = await additions.getAdditions(ate_IdAtencion);

        const _MEDICAMENTOS = [];
        const _INSUMOS = [];
        const _PROCEDIMIENTOS = [];

        resultDX.map(async (med) => {
          const { adi_IdDiagnostico } = med;
          const resultMed = await medicaments.medicament(adi_IdDiagnostico);
          if (resultMed.length > 0)
            resultMed.map(async (resM) => _MEDICAMENTOS.push(resM));

          const resultIns = await supplies.insumos(adi_IdDiagnostico);
          if (resultIns.length > 0)
            resultIns.map(async (resI) => _INSUMOS.push(resI));

          const resultPro = await procedures.getProcedures(adi_IdDiagnostico);
          if (resultPro.length > 0)
            resultPro.map(async (resP) => _PROCEDIMIENTOS.push(resP));
        });

        attentions.push({
          ...a,
          _INDEX: i + 1,
          _ACT_PREVENTIVAS: resultActP,
          _DIAGNOSTICOS: resultDX,
          _MEDICAMENTOS,
          _INSUMOS,
          _PROCEDIMIENTOS,
          _SERVICIOS_ADICIONALES: resultAdditions,
        });
      })
    );
    // const attentionsBackup = { ...attentions };
    // console.log('attentions>>>: ', attentionsBackup);

    // console.log('attentions>>>: ', attentions);
    return new Promise((resolve, reject) => {
      try {
        return resolve(attentions);
      } catch (error) {
        return reject(error);
      }
    });
  },
};
