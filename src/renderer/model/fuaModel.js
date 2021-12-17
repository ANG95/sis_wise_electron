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
  insertImportData: (data) => {
    return new Promise((resolve, reject) => {
      DBcon.query(
        `
          INSERT INTO bdsis_data.i_atencion(
            ate_IdAtencion,
            ate_IdFormato,
            ate_IdDisa,
            ate_Lote,
            ate_Numero,
            ate_EsReconsideracion,
            ate_IdDisaReconsidera,
            ate_LoteReconsidera,
            ate_NroReconsidera,
            ate_IdEESS,
            ate_IdComponente,
            ate_IdTipoFormato,
            ate_IdSitFormato,
            ate_IdDisaFormato,
            ate_LoteFormato,
            ate_NroFormato,
            ate_IdTipoDocumento,
            ate_NroDocumento,
            ate_IdInstitucion,
            ate_NroInstitucion,
            ate_IdIAFAS,
            ate_codsegIAFAS,
            ate_idIIEE,
            ate_idnivelIIEE,
            ate_idgradoIIEE,
            ate_seccionIIEE,
            ate_idturnoIIEE,
            ate_IIEEeduespecial,
            ate_ApePaterno,
            ate_ApeMaterno,
            ate_PriNombre,
            ate_OtrNombre,
            ate_FecNac,
            ate_IdSexo,
            ate_IdTipoAtencion,
            ate_IdCondicion,
            ate_IdModalidad,
            ate_NroAutorizacion,
            ate_Monto,
            ate_NroAutorizaCartaG,
            ate_montoCartaG,
            ate_UDRautorizaFUA,
            ate_LoteautorizaFUA,
            ate_secautorizaFUA,
            ate_disaFUAVinculado,
            ate_loteFUAVinculado,
            ate_secFUAVinculado,
            ate_idsepelio,
            ate_FecAte,
            ate_HoraAte,
            ate_IdUPS,
            ate_IdLugar,
            ate_HisCli,
            ate_IdEtnia,
            ate_FecParto,
            ate_IdOrigenPersonal,
            ate_idEESSFlexible,
            ate_IdServicio,
            ate_IdEESSRefirio,
            ate_NroHojaRefirio,
            ate_IdDestinoAsegurado,
            ate_IdEESSContraRefiere,
            ate_NroHojaContraRefiere,
            ate_FecIng,
            ate_FecAlta,
            ate_FecFallecimiento,
            ate_FecCorteAdm,
            ate_IdResAtencion,
            ate_Profesional,
            ate_IdTipoPersonalSalud,
            ate_Colegiatura,
            ate_IdEspecialidad,
            ate_NroEspecialidad,
            ate_Observacion,
            ate_Edad,
            ate_TipoEdad,
            ate_EdadReal,
            ate_Edades,
            ate_IdGrupoEtareo,
            ate_Autogenerado,
            ate_IdPPDD,
            ate_IdOdsis,
            ate_IdUsuarioTrans,
            ate_FecTrans,
            ate_IdGrupoRiesgo,
            ate_CostoServ,
            ate_CostoMedi,
            ate_CostoInsu,
            ate_CostoProc,
            ate_CostoTotal,
            ate_Periodo,
            ate_Mes,
            ate_Envio,
            ate_IdSupervision,
            ate_IdEstado,
            ate_version,
            ate_CorrelativoInsAus,
            ate_IdFormatoSiasis,
            ate_TipoTablaSiasis,
            ate_FecCrea,
            ate_PerOrigen,
            ate_codaplicativo,
            ATE_ESESGRESADOPERSONALSALUD,
            ATE_PLAN,
            ATE_GRUPOPOBLACIONAL,
            ATE_IDORIGENACTADEFUNCION,
            ATE_ACTADEFUNCION,
            ate_IdPaquete,
            ate_tipodocumentopersonalsalud,
            ate_cpms,
            ate_nroacreditacion,
            ate_renipress,
            ate_esnuevoformato
        )
          VALUES ?`,
        [data],
        (err, results) => {
          if (err) return reject(err);
          return resolve(results);
        }
      );
    });
  },
};
