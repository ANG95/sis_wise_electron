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
  insertImportedData: (data) => {
    return new Promise((resolve, reject) => {
      try {
        const funParsedor = (d) => [
          d.ate_IdAtencion,
          d.ate_IdFormato,
          d.ate_IdDisa,
          d.ate_Lote,
          d.ate_Numero,
          d.ate_EsReconsideracion,
          d.ate_IdDisaReconsidera,
          d.ate_LoteReconsidera,
          d.ate_NroReconsidera,
          d.ate_IdEESS,
          d.ate_IdComponente,
          d.ate_IdTipoFormato,
          d.ate_IdSitFormato,
          d.ate_IdDisaFormato,
          d.ate_LoteFormato,
          d.ate_NroFormato,
          d.ate_IdTipoDocumento,
          d.ate_NroDocumento,
          d.ate_IdInstitucion,
          d.ate_NroInstitucion,
          d.ate_IdIAFAS,
          d.ate_codsegIAFAS,
          d.ate_idIIEE,
          d.ate_idnivelIIEE,
          d.ate_idgradoIIEE,
          d.ate_seccionIIEE,
          d.ate_idturnoIIEE,
          d.ate_IIEEeduespecial,
          d.ate_ApePaterno,
          d.ate_ApeMaterno,
          d.ate_PriNombre,
          d.ate_OtrNombre,
          d.ate_FecNac,
          d.ate_IdSexo,
          d.ate_IdTipoAtencion,
          d.ate_IdCondicion,
          d.ate_IdModalidad,
          d.ate_NroAutorizacion,
          d.ate_Monto,
          d.ate_NroAutorizaCartaG,
          d.ate_montoCartaG,
          d.ate_UDRautorizaFUA,
          d.ate_LoteautorizaFUA,
          d.ate_secautorizaFUA,
          d.ate_disaFUAVinculado,
          d.ate_loteFUAVinculado,
          d.ate_secFUAVinculado,
          d.ate_idsepelio,
          d.ate_FecAte,
          d.ate_HoraAte,
          d.ate_IdUPS,
          d.ate_IdLugar,
          d.ate_HisCli,
          d.ate_IdEtnia,
          d.ate_FecParto,
          d.ate_IdOrigenPersonal,
          d.ate_idEESSFlexible,
          d.ate_IdServicio,
          d.ate_IdEESSRefirio,
          d.ate_NroHojaRefirio,
          d.ate_IdDestinoAsegurado,
          d.ate_IdEESSContraRefiere,
          d.ate_NroHojaContraRefiere,
          d.ate_FecIng,
          d.ate_FecAlta,
          d.ate_FecFallecimiento,
          d.ate_FecCorteAdm,
          d.ate_IdResAtencion,
          d.ate_Profesional,
          d.ate_IdTipoPersonalSalud,
          d.ate_Colegiatura,
          d.ate_IdEspecialidad,
          d.ate_NroEspecialidad,
          d.ate_Observacion,
          d.ate_Edad,
          d.ate_TipoEdad,
          d.ate_EdadReal,
          d.ate_Edades,
          d.ate_IdGrupoEtareo,
          d.ate_Autogenerado,
          d.ate_IdPPDD,
          d.ate_IdOdsis,
          d.ate_IdUsuarioTrans,
          d.ate_FecTrans,
          d.ate_IdGrupoRiesgo,
          d.ate_CostoServ,
          d.ate_CostoMedi,
          d.ate_CostoInsu,
          d.ate_CostoProc,
          d.ate_CostoTotal,
          d.ate_Periodo,
          d.ate_Mes,
          d.ate_Envio,
          d.ate_IdSupervision,
          d.ate_IdEstado,
          d.ate_version,
          d.ate_CorrelativoInsAus,
          d.ate_IdFormatoSiasis,
          d.ate_TipoTablaSiasis,
          d.ate_FecCrea,
          d.ate_PerOrigen,
          d.ate_codaplicativo,
          d.ATE_ESESGRESADOPERSONALSALUD,
          d.ATE_PLAN,
          d.ATE_GRUPOPOBLACIONAL,
          d.ATE_IDORIGENACTADEFUNCION,
          d.ATE_ACTADEFUNCION,
          d.ate_IdPaquete,
          d.ate_tipodocumentopersonalsalud,
          d.ate_cpms,
          d.ate_nroacreditacion,
          d.ate_renipress,
          d.ate_esnuevoformato,
        ];
        const dataParced = data.map(funParsedor);
        console.log(dataParced);
        const results = fuaModel.insertImportData(dataParced);
        return resolve(results);
      } catch (error) {
        return reject(error);
      }
    });
  },
};
