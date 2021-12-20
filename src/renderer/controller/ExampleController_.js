/* eslint-disable @typescript-eslint/naming-convention */
const userType = require('../model/AtencionesModel');
const actPrevent = require('../model/ActPreventivasModel');
const diagnostics = require('../model/DiagnosticosModel');
const medicaments = require('../model/MedicamentosModel');

module.exports = {
  get: async (of, to) => {
    const results = await userType.get(of, to);
    const attentions = [];
    // const resultActPreventives = await actPrevent.actPreventives(269644);
    // console.log('resultActPreventives', resultActPreventives);
    results.forEach(async (a) => {
      const medicamentsData = [];
      const { ate_IdAtencion } = a;

      const resultActP = await actPrevent.actPreventives(ate_IdAtencion);
      const resultDX = await diagnostics.dx(ate_IdAtencion);
      resultDX.forEach(async (med) => {
        const { adi_IdDiagnostico } = med;
        const resultMed = await medicaments.medicament(adi_IdDiagnostico);
        medicamentsData.push(resultMed);
      });
      attentions.push({
        ...a,
        actPreventivas: resultActP,
        diagnosticos: resultDX,
        medicamentos: medicamentsData,
      });
    });
    console.log('attentions>>>: ', attentions);
    return new Promise((resolve, reject) => {
      try {
        return resolve(attentions);
      } catch (error) {
        return reject(error);
      }
    });
  },
};
