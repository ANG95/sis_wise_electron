/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Debounce } from '../../../lib/functions';
import FuaController from '../../../controller/fuaController';
import Loading from '../absoluteLoading/loading';

// import PropTypes from 'prop-types';

export default function FuaDigital({ dataFuas }) {
  const [fua, setFua] = useState(null);
  const [loading, setLoading] = useState(false);
  const [attention, setAttention] = useState({});

  useEffect(() => {
    if (dataFuas) {
      setFua(dataFuas);
    }
  }, [dataFuas]);

  const saveEDitedFUA = async () => {
    setLoading(true);
    const {
      ate_Lote,
      ate_Numero,
      ate_renipress,
      fecha_dig,
      hora_dig,
      ate_IdAtencion,
      ate_esnuevoformato,
      ate_IdEESS,
    } = fua;

    let updateFuaPayload = {
      lot: ate_Lote,
      numberFormat: ate_Numero,
      codRenaes: ate_renipress.substring(2),
      date: `${fecha_dig} 00:00:00`,
      hour: `${hora_dig}:00`,
      idAttention: ate_IdAtencion,
      idEESS: attention.pre_IdEESS || ate_IdEESS,
    };
    if (ate_esnuevoformato === 'N') {
      updateFuaPayload = {
        ...updateFuaPayload,
        codRenaes: '290',
      };
    }

    try {
      const result = await FuaController.updateFUA(updateFuaPayload);
      if (result.affectedRows) {
        setFua(null);
        const notification = new window.Notification('GENIAL ACTUALIZADO', {
          body: `${ate_Lote}-${ate_Numero}`,
          icon: 'https://www.seekpng.com/png/detail/334-3345964_error-icon-download-attention-symbol.png',
        });
        notification.onclose = () => console.log('Closed');
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (name, value) => {
    setFua({
      ...fua,
      [name]: value,
    });
  };
  const handleInputEESS = Debounce(async (name, value) => {
    try {
      const result = await FuaController.searchEESS(value);
      if (result.length > 0) {
        setFua({
          ...fua,
          [name]: value,
          nombre_eess: result[0].pre_Nombre,
        });
        setAttention(result[0]);
      }
    } catch (error) {
      console.log('error', error);
    }
  }, 500);
  return (
    fua && (
      <>
        <Container>
          <Row>
            <Col>
              <fieldset>
                <legend>NUMERO DE FORMATO</legend>
                <div className="d-flex align-items-center">
                  {fua.ate_IdDisa}-
                  <input
                    type="text"
                    style={{ width: '50px' }}
                    className="form-control"
                    value={fua.ate_Lote}
                    onChange={({ target: { value } }) =>
                      handleInputChange('ate_Lote', value)
                    }
                  />
                  -
                  <input
                    type="text"
                    className="form-control"
                    value={fua.ate_Numero}
                    onChange={({ target: { value } }) =>
                      handleInputChange('ate_Numero', value)
                    }
                  />
                </div>
              </fieldset>
            </Col>
            <Col>
              <fieldset>
                <legend>NOMBRE DEL EE.SS.</legend>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={fua.ate_renipress}
                  onChange={({ target: { value } }) =>
                    handleInputEESS('ate_renipress', value)
                  }
                />
                <div className="form-control">{fua.nombre_eess}</div>
              </fieldset>
            </Col>
            <Col>
              <fieldset>
                <legend>FECHA Y HORA DE ATENCION</legend>
                <div className="d-flex align-items-center">
                  <input
                    type="date"
                    className="form-control"
                    value={fua.fecha_dig}
                    onChange={({ target: { value } }) =>
                      handleInputChange('fecha_dig', value)
                    }
                  />
                  <input
                    type="time"
                    className="form-control"
                    value={fua.hora_dig}
                    onChange={({ target: { value } }) =>
                      handleInputChange('hora_dig', value)
                    }
                  />
                </div>
              </fieldset>
            </Col>
          </Row>
          <br />
          <Button type="button" onClick={() => saveEDitedFUA()}>
            GUARDAR CAMBIOS
          </Button>
        </Container>
        {loading && <Loading />}

        <hr />
        {/*
        <div className="bordesdiv">
          <table className="tablaborder">
            <tr>
              <td colSpan="10" className="imprimir">
                FORMATO UNICO DE ATENCION - FUA
              </td>
            </tr>
            <tr>
              <td width="316" className="imprimir2">
                NUMERO DE FORMATO
              </td>
              <td colSpan="6" className="imprimir2">
                INSTITUCION EDUCATIVA
              </td>
              <td colSpan="3" className="imprimir2">
                CODIGO
              </td>
            </tr>
            <tr>
              <td rowSpan="2" className="CourierNew">
                <div className="d-flex align-items-center">
                  {dataFuas?.ate_IdDisa || ''}-
                  <input
                    type="text"
                    style={{ width: '50px' }}
                    className="form-control form-control-sm"
                    value={dataFuas.ate_Lote}
                  />
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    value={dataFuas.ate_Numero}
                  />
                </div>
              </td>
              <td colSpan="6" className="CourierNew">
                institucion_educativa
              </td>
              <td colSpan="3" className="CourierNew">
                codigo
              </td>
            </tr>

            <tr>
              <td width="86" className="imprimir2">
                INIC.
              </td>
              <td width="77" className="imprimir2">
                PRIM.
              </td>
              <td width="77" className="imprimir2">
                SEC.
              </td>
              <td width="185" className="CourierNew">
                grados
              </td>
              <td width="125" className="imprimir2">
                SECCION
              </td>
              <td width="200" className="CourierNew">
                seccion
              </td>
              <td colSpan="2" className="imprimir2">
                TURNO
              </td>
              <td width="168" className="CourierNew">
                turno
              </td>
            </tr>
          </table>
        </div>
        <div className="bordesdiv">
          <table className="tablaborder">
            <tr>
              <td colSpan="12" className="imprimir">
                DE LA INSTITUCION PRESTADORA DE SERVICIOS DE SALUD
              </td>
            </tr>
            <tr>
              <td colSpan="3" className="imprimir2">
                CODIGO RENAES DE LA IPRESS
              </td>
              <td colSpan="9" className="imprimir2">
                NOMBRE DE LA IPRESS QUE REALIZA LA ATENCION
              </td>
            </tr>
            <tr>
              <td colSpan="3" className="CourierNew">
                cod_renaes_ipress
              </td>
              <td colSpan="9" className="CourierNew">
                nom_ipress_realiza_atencion
              </td>
            </tr>
          </table>

          <table className="tablaborder">
            <tr>
              <td colSpan="3" className="imprimir">
                PERSONAL QUE ATIENDE
              </td>
              <td colSpan="2" className="imprimir">
                LUGAR DE ATENCION
              </td>
              <td colSpan="2" className="imprimir">
                ATENCION
              </td>
              <td colSpan="5" className="imprimir">
                REFERENCIA REALIZADO POR
              </td>
            </tr>
            <tr>
              <td width="120" className="imprimir2">
                DE LA IPRESS
              </td>
              <td width="87" className="CourierNew">
                x IPRESS
              </td>
              <td width="150" className="imprimir2">
                CODIGO DE LA <br />
                OFERTA FLEXIBLE
              </td>
              <td width="100" className="imprimir2">
                INTRAMURAL
              </td>
              <td width="50" className="CourierNew">
                X INTRA
              </td>
              <td width="96" className="imprimir2">
                AMBULATORIA
              </td>
              <td width="61" className="CourierNew">
                X AMBU
              </td>
              <td width="150" className="imprimir2">
                COD. RENAES
              </td>
              <td colSpan="3" className="imprimir2">
                NOMBRE DE LA IPRESS U OFERTA FLEXIBLE
              </td>
              <td width="156" className="imprimir2">
                N° HOJA DE REFERENCIA
              </td>
            </tr>
            <tr>
              <td width="120" className="imprimir2">
                ITINERANTE
              </td>
              <td width="87" className="CourierNew">
                X ITIN
              </td>
              <td width="150" rowSpan="2" className="CourierNew">
                cod_ oferta _flexible
              </td>
              <td width="100" className="imprimir2">
                EXTRAMURAL
              </td>
              <td width="50" className="CourierNew">
                X EXTRA
              </td>
              <td width="96" className="imprimir2">
                REFERENCIA
              </td>
              <td width="61" className="CourierNew">
                X REF
              </td>
              <td width="150" className="CourierNew">
                cod _renaes
              </td>
              <td width="242" className="CourierNew">
                monb _ipress _flexible
              </td>
              <td colSpan="3" className="CourierNew">
                n _hoja _referencia
              </td>
            </tr>
            <tr>
              <td width="120" className="imprimir2">
                OFERTA FLEXIBLE
              </td>
              <td width="87" className="CourierNew">
                X OFERTA F
              </td>

              <td colSpan="2">&nbsp;</td>
              <td className="imprimir2">EMERGENCIA</td>
              <td className="CourierNew">X EMERG</td>
              <td colSpan="2">&nbsp;</td>
            </tr>
          </table>
        </div>

        <div className="bordesdiv">
          <table className="tablaborder">
            <tr>
              <td colSpan="11" className="imprimir">
                DEL ASEGURADO / USUARIO
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="imprimir2">
                IDENTIFICACION
              </td>
              <td colSpan="3" className="imprimir2">
                CODIGO DE ASEGURADO SIS
              </td>
              <td colSpan="6" className="imprimir2">
                ASEGURADO DE OTRAS IAFAS
              </td>
            </tr>
            <tr>
              <td width="20" className="imprimir2">
                TDI
              </td>
              <td width="100" className="imprimir2">
                N° DOCUMENTO DE IDENTIDAD
              </td>
              <td width="30" className="imprimir2">
                DIRESA/OTROS
              </td>
              <td colSpan="2" className="imprimir2">
                NUMERO
              </td>
              <td width="69" className="imprimir2">
                COD. SEGURO
              </td>
              <td colSpan="5" className="CourierNew">
                NO SIS
              </td>
            </tr>
            <tr>
              <td width="20" className="CourierNew">
                tdi
              </td>
              <td width="100" className="CourierNew">
                dni
              </td>
              <td width="30" className="CourierNew">
                diresa_otros
              </td>
              <td width="150" className="CourierNew">
                numero1
              </td>
              <td width="150" className="CourierNew">
                numero2
              </td>
              <td className="imprimir2"> INSTITUCION </td>
              <td colSpan="5" className="CourierNew">
                nosis
              </td>
            </tr>
          </table>
        </div>
        <div className="bordesdiv">
          <table className="tablaborder">
            <tr>
              <td colSpan="5" className="imprimir">
                APELLIDO PATERNO
              </td>
              <td colSpan="5" className="imprimir">
                APELLIDO MATERNO
              </td>
            </tr>
            <tr>
              <td colSpan="5" className="CourierNew">
                {dataFuas.ate_ApePaterno}
              </td>
              <td colSpan="5" className="CourierNew">
                {dataFuas.ate_ApeMaterno}
              </td>
            </tr>
            <tr>
              <td colSpan="5" className="imprimir">
                PRIMER NOMBRE
              </td>
              <td colSpan="5" className="imprimir">
                SEGUNDO NOMBRES
              </td>
            </tr>
            <tr>
              <td colSpan="5" className="CourierNew">
                {dataFuas.ate_PriNombre}
              </td>
              <td colSpan="5" className="CourierNew">
                {dataFuas.ate_OtrNombre || ''}
              </td>
            </tr>
          </table>
        </div>
        <div className="bordesdiv">
          <table className="tablaborder">
            <tr>
              <td colSpan="2" className="imprimir">
                SEXO
              </td>
              <td width="207" className="imprimir">
                FECHA
              </td>
              <td colSpan="5" className="imprimir">
                DIA MES AÑO
              </td>
              <td width="291" className="imprimir">
                N° DE HISTORIA CLINICA
              </td>
              <td width="287" className="imprimir">
                ETNIA
              </td>
            </tr>
            <tr>
              <td width="144" className="imprimir2">
                MASCULINO
              </td>
              <td width="61" className="CourierNew">
                m
              </td>
              <td width="207" rowSpan="2" className="imprimir2">
                FECHA PROBABLE <br /> DE PARTO/ FECHA DE
                <br /> PARTO
              </td>
              <td colSpan="5" rowSpan="2" className="CourierNew">
                f_prob_parto
              </td>
              <td className="CourierNew">n_historia_clinica</td>
              <td width="287" className="CourierNew">
                etnia
              </td>
            </tr>

            <tr>
              <td width="144" className="imprimir2">
                FEMENINO
              </td>
              <td width="61" className="CourierNew">
                f
              </td>
              <td className="imprimir2">DNI /CNV/AFILIACION DEL RN 1</td>
              <td width="287" className="CourierNew">
                rn1
              </td>
            </tr>

            <tr>
              <td height="22" colSpan="2" className="imprimir">
                SALUD MATERNA
              </td>
              <td width="207" className="imprimir2">
                FECHA DE NACIMIENTO
              </td>
              <td colSpan="5" className="CourierNew">
                f_nacimiento
              </td>
              <td className="imprimir2">DNI /CNV/AFILIACION DEL RN 2</td>
              <td width="287" className="CourierNew">
                rn2
              </td>
            </tr>

            <tr>
              <td width="144" className="imprimir2">
                GESTANTE
              </td>
              <td width="61" className="CourierNew">
                GESTANTE
              </td>
              <td className="imprimir2">FECHA DE FALLECIMIENTO</td>
              <td width="301" colSpan="5" className="CourierNew">
                f_fallecimiento
              </td>
              <td className="imprimir2">DNI /CNV/AFILIACION DEL RN 3</td>
              <td width="287" className="CourierNew">
                rn3
              </td>
            </tr>
            <tr>
              <td className="imprimir2">PUERPERA</td>
              <td className="CourierNew">PUERPERA</td>
              <td colSpan="8">&nbsp;</td>
            </tr>
          </table>
        </div>
        <div className="bordesdiv">
          <table className="tablaborder">
            <tr>
              <td colSpan="14" className="imprimir">
                DE LA ATENCIÓN
              </td>
            </tr>
            <tr>
              <td colSpan="3" className="imprimir">
                FECHA DE ATENCIÓN
              </td>
              <td colSpan="3" className="imprimir2">
                HORA
              </td>
              <td className="imprimir2">UPS</td>
              <td className="imprimir2">CÓD. PRESTA.</td>
              <td className="imprimir2">
                CÓD PRESTACION (ES)
                <br /> ADICIONAL (ES)
              </td>
              <td rowSpan="5" className="imprimir2" width="1">
                <div className="rotate90g">HOSPITALIZACIÓN</div>
              </td>
              <td className="imprimir2" width="25">
                FECHA
              </td>
              <td className="imprimir2">DIA</td>
              <td className="imprimir2">MES</td>
              <td className="imprimir2">AÑO</td>
            </tr>
            <tr>
              <td className="imprimir2">DIA</td>
              <td className="imprimir2">MES</td>
              <td className="imprimir2">AÑO</td>
              <td rowSpan="2" className="CourierNew">
                10
              </td>
              <td rowSpan="2" className="CourierNew">
                :
              </td>
              <td rowSpan="2" className="CourierNew">
                20
              </td>
              <td rowSpan="2" className="CourierNew">
                ups
              </td>
              <td rowSpan="2" className="CourierNew">
                21
              </td>
              <td rowSpan="2" className="CourierNew">
                cod prestaciona
              </td>
              <td className="imprimir2" width="25">
                DE INGRESO
              </td>
              <td className="CourierNew">de </td>
              <td className="CourierNew">in</td>
              <td className="CourierNew">greso</td>
            </tr>
            <tr>
              <td className="CourierNew">18</td>
              <td className="CourierNew">11</td>
              <td className="CourierNew">2018</td>
              <td className="imprimir2" width="25">
                DE ALTA
              </td>
              <td className="CourierNew">de</td>
              <td className="CourierNew"> al</td>
              <td className="CourierNew">ta</td>
            </tr>
            <tr>
              <td colSpan="3" rowSpan="2" className="imprimir">
                REPORTE VINCULADO
              </td>
              <td colSpan="4" className="imprimir2">
                CÓD. AUTORIZACIÓN
              </td>
              <td colSpan="2" className="imprimir2">
                N° FUA A VINCULAR
              </td>
              <td rowSpan="2" className="imprimir2" width="25">
                DE CORTE
                <br /> ADMINISTRATIVO
              </td>
              <td rowSpan="2" className="CourierNew">
                cor
              </td>
              <td rowSpan="2" className="CourierNew">
                te
              </td>
              <td rowSpan="2" className="CourierNew">
                admin
              </td>
            </tr>
            <tr>
              <td colSpan="4" className="CourierNew">
                cod autorizaicon
              </td>
              <td colSpan="2" className="CourierNew">
                n° fua a vincular
              </td>
            </tr>
          </table>
        </div>

        <div className="bordesdiv">
          <table className="tablaborder">
            <tr>
              <th className="imprimir" colSpan="14">
                CONCEPTO PRESTACIONAL
              </th>
            </tr>
            <tr>
              <td rowSpan="3" className="imprimir">
                ATENCIÓN DIRECTA
              </td>
              <td rowSpan="3" className="CourierNew">
                atencion_directa
              </td>
              <td colSpan="2" className="imprimir">
                COB EXTRAORDINARIA
              </td>
              <td colSpan="2" className="imprimir">
                CARTA DE GARANTIA
              </td>
              <td rowSpan="3" className="imprimir">
                TRASLADO
              </td>
              <td rowSpan="3" className="CourierNew">
                traslado
              </td>
              <td colSpan="6" className="imprimir">
                {' '}
                SEPELIO
              </td>
            </tr>
            <tr>
              <td className="imprimir2">Nº Autorización</td>
              <td className="CourierNew">n_autori_cob</td>
              <td className="imprimir2">Nº Autorización</td>
              <td className="CourierNew">n_autori_carta</td>
              <td rowSpan="2" className="imprimir2">
                NATIMUERTO
              </td>
              <td rowSpan="2" className="CourierNew">
                nati
              </td>
              <td rowSpan="2" className="imprimir2">
                OBITO
              </td>
              <td rowSpan="2" className="CourierNew">
                obito
              </td>
              <td rowSpan="2" className="imprimir2">
                OTRO
              </td>
              <td rowSpan="2" className="CourierNew">
                otro_sepelio
              </td>
            </tr>
            <tr>
              <td className="imprimir2"> Monto S/.</td>
              <td className="CourierNew">monto_S_extra</td>
              <td className="imprimir2">Monto S/.</td>
              <td className="CourierNew">monto_carta</td>
            </tr>
          </table>
        </div>

        <div className="bordesdiv">
          <table className="tablaborder">
            <tr>
              <th className="imprimir" colSpan="18">
                DEL DESTINO DEL ASEGURADO/USUARIO
              </th>
            </tr>
            <tr>
              <td className="imprimir2" rowSpan="2">
                ALTA
              </td>
              <td className="CourierNew" rowSpan="2">
                alta
              </td>
              <td className="imprimir2" rowSpan="2">
                CITA
              </td>
              <td className="CourierNew" rowSpan="2">
                cita
              </td>
              <td className="imprimir2" rowSpan="2">
                HOSPITALIZACIÓN
              </td>
              <td className="CourierNew" rowSpan="2">
                hospi..
              </td>
              <td className="imprimir" colSpan="6">
                REFERIDO
              </td>
              <td className="imprimir2" rowSpan="2">
                CONTRARREFERIDO
              </td>
              <td className="CourierNew" rowSpan="2">
                contraref...
              </td>
              <td className="imprimir2" rowSpan="2">
                FALLECIDO
              </td>
              <td className="CourierNew" rowSpan="2">
                fallecid...
              </td>
              <td className="imprimir2" rowSpan="2">
                CORTE ADMINIS.
              </td>
              <td className="CourierNew" rowSpan="2">
                corte_admin
              </td>
            </tr>
            <tr>
              <td className="imprimir2">EMERGENCIA</td>
              <td className="CourierNew">emer..</td>
              <td className="imprimir2">CONSULTA EXTERNA</td>
              <td className="CourierNew">consult_exter</td>
              <td className="imprimir2">APOYO ALDIAGNÓSTICO</td>
              <td className="CourierNew">apoyo_diag</td>
            </tr>
          </table>
        </div>
        <div className="bordesdiv">
          <table className="tablaborder">
            <tr>
              <th className="imprimir" colSpan="3">
                SE REFIERE / CONTRARREFIERE A:
              </th>
            </tr>
            <tr>
              <td className="imprimir2">CÓDIGO RENAES DE LA IPRESS</td>
              <td className="imprimir2">
                NOMBRE DE LA IPRESS A LA QUE SE REFIERE / CONTRARREFIERE
              </td>
              <td className="imprimir2">N° HOJA DE REFER / CONTRARR.</td>
            </tr>
            <tr>
              <td className="CourierNew">codigo_renaes_ipres</td>
              <td className="CourierNew">nomb_ipress_que_refiere</td>
              <td className="CourierNew">n_hoja_ipress_contrarefiere</td>
            </tr>
          </table>
        </div>


        <div className="bordesdiv">
          <table className="tablaborder">
            <tr>
              <th colSpan="13" className="imprimir">
                ACTIVIDADES PREVENTIVAS Y OTROS
              </th>
              <th colSpan="7" className="imprimir">
                VACUNAS N° DE DOSIS
              </th>
            </tr>
            <tr>
              <td colSpan="3">PESO (Kg)</td>
              <td>65</td>
              <td colSpan="3">TALLA (cm)</td>
              <td colSpan="2">1.54</td>
              <td colSpan="2">P.A. (mmHg)</td>
              <td colSpan="2">90/60</td>
              <td>BCG</td>
              <td>bcg</td>
              <td>INFLUENZA</td>
              <td>influenza</td>
              <td>ANTIAMARILICA</td>
              <td colSpan="2">antiamari...</td>
            </tr>
            <tr>
              <td colSpan="2">DE LA GESTANTE</td>
              <td colSpan="5">DEL RECIEN NACIDO</td>
              <td colSpan="4">
                GESTANTE / RN /&nbsp;&nbsp;NIÑO / ADOLESCENTE / JOVEN Y ADULTO /
                ADULTO MAYOR
              </td>
              <td colSpan="2">JOVEN Y ADULTO</td>
              <td>DPT</td>
              <td>dpt</td>
              <td>PAROTID</td>
              <td>parotid</td>
              <td>ANTINEUMOC</td>
              <td colSpan="2">antineu..</td>
            </tr>
            <tr>
              <td>CPN (N°)</td>
              <td>cpn</td>
              <td colSpan="4">EDAD GEST RN (SEM)</td>
              <td>edad_ges_rn</td>
              <td>CRED N°</td>
              <td>n_cred</td>
              <td>PAB (cm)</td>
              <td>pab</td>
              <td>EVALUACIÓN INTEGRAL</td>
              <td>eval_inte</td>
              <td>APO</td>
              <td>apo</td>
              <td>RUBEOLA</td>
              <td>rubeola</td>
              <td>ANTITETANICA</td>
              <td colSpan="2">antiteta..</td>
            </tr>
            <tr>
              <td>EDAD GEST</td>
              <td>edad_ges</td>
              <td rowSpan="2">APGAR</td>
              <td rowSpan="2">1°</td>
              <td rowSpan="2">apgar_1</td>
              <td rowSpan="2">5°</td>
              <td rowSpan="2">apgar_5</td>
              <td>R.N. PREMATURO</td>
              <td>rn_prematu</td>
              <td>TAP/ EEDP o&nbsp;&nbsp;TEPSI</td>
              <td>tap_eedp</td>
              <td colSpan="2">ADULTO MAYOR</td>
              <td>ASA</td>
              <td>asa</td>
              <td>ROTAVIRUS</td>
              <td>rotavirus</td>
              <td>COMPLETAS PARA LA EDAD</td>
              <td>SI</td>
              <td>NO</td>
            </tr>
            <tr>
              <td>ALTURA UTERINA</td>
              <td>altura_uteri..</td>
              <td>BAJO PESO AL NACER</td>
              <td>bajo_peso</td>
              <td>CONSEJERIA NUTRICIONAL</td>
              <td>consejeria_nut</td>
              <td>VACAM</td>
              <td>vacam</td>
              <td>SPR</td>
              <td>spr</td>
              <td>DT ADULTO (N° DOSIS)</td>
              <td>dt_adulto</td>
              <td>VPH</td>
              <td colSpan="2">vph</td>
            </tr>
            <tr>
              <td>PARTO VERTICAL</td>
              <td>parto_vertical</td>
              <td colSpan="4">Corte Tardío de Cordón (2 a 3 min)</td>
              <td>corte tardio</td>
              <td>ENFER. CONGENITA / SECUELA AL NACER</td>
              <td>enfer:_conge</td>
              <td>CONSEJERIA INTEGRAL</td>
              <td>consejeria_inte</td>
              <td rowSpan="2">TAMIZAJE DE SALUD MENTAL</td>
              <td>PAT.</td>
              <td>SR</td>
              <td>sr</td>
              <td>IPV</td>
              <td>ipv</td>
              <td>OTRA VACUNA</td>
              <td colSpan="2">otra_vacuna</td>
            </tr>
            <tr>
              <td>CONTROL PUERP (N°)</td>
              <td>control_puerp</td>
              <td colSpan="5" />
              <td>N° FAMILIARES DE GEST / PUERP. CASA MAT.</td>
              <td>n_familiares</td>
              <td>IMC (Kg/M2)</td>
              <td>imc</td>
              <td>NOR.</td>
              <td>HVB</td>
              <td>hvb</td>
              <td>PENTAVAL</td>
              <td>pentaval</td>
              <td />
              <td colSpan="2" />
            </tr>
            <tr>
              <td colSpan="13" />
              <td>GRUPO DE RIESGO HVB</td>
              <td>grupo_reiesgo</td>
              <td colSpan="5">
                GRUPO DE RIESGO HVB: 1. TRABAJADOR DE SALUD 2. TRABAJAD. SEXUALES
                3. HSH 4. PRIVADO LIBERTAD 5. FF. AA. 6. POLICIA NACIONAL 7.
                ESTUDIANTES DE SALUD 8. POLITRANFUNDIDOS 9. DROGO DEPENDIENTES
              </td>
            </tr>
          </table>
        </div>
        <div className="bordesdiv">
          <table className="tablaborder">
            <tr>
              <th className="imprimir" colSpan="9">
                DIAGNÓSTICOS
              </th>
            </tr>
            <tr>
              <td rowSpan="2">N°</td>
              <td rowSpan="2">DESCRIPCIÓN</td>
              <td colSpan="4">INGRESO</td>
              <td colSpan="3">EGRESO</td>
            </tr>
            <tr>
              <td colSpan="3">TIPO DE DX</td>
              <td>CIE - 10</td>
              <td colSpan="2">TIPO DE DX</td>
              <td>CIE - 10</td>
            </tr>
            <tr>
              <td>1</td>
              <td>NORMAL</td>
              <td>P</td>
              <td>D</td>
              <td>R</td>
              <td>Z00.0</td>
              <td>D</td>
              <td>R</td>
              <td />
            </tr>
            <tr>
              <td>2</td>
              <td>BAJO PESO</td>
              <td>P</td>
              <td>D</td>
              <td>R</td>
              <td>E44.0</td>
              <td>D</td>
              <td>R</td>
              <td />
            </tr>
            <tr>
              <td>3</td>
              <td>SOBRE PESO</td>
              <td>P</td>
              <td>D</td>
              <td>R</td>
              <td>E66.0</td>
              <td>D</td>
              <td>R</td>
              <td />
            </tr>
            <tr>
              <td>4</td>
              <td>OBESIDAD</td>
              <td>P</td>
              <td>D</td>
              <td>R</td>
              <td>E66.9</td>
              <td>D</td>
              <td>R</td>
              <td />
            </tr>
            <tr>
              <td>5</td>
              <td />
              <td>P</td>
              <td>D</td>
              <td>R</td>
              <td />
              <td>D</td>
              <td>R</td>
              <td />
            </tr>
          </table>
        </div>

        <div className="bordesdiv">
          <table className="tablaborder">
            <tr>
              <th className="imprimir">N° DE DNI</th>
              <th className="imprimir" colSpan="5">
                NOMBRE DEL RESPONSABLE DE LA ATENCIÓN
              </th>
              <th className="imprimir" colSpan="2">
                N° DE COLEGIATURA
              </th>
            </tr>
            <tr>
              <td>40302574</td>
              <td colSpan="5">JUAN MERCADO BARRA</td>
              <td colSpan="2">20800</td>
            </tr>
            <tr>
              <td>RESPONSABLE DE LA ATENCIÓN</td>
              <td>1</td>
              <td>ESPECIALIDAD</td>
              <td />
              <td>N° RNE</td>
              <td />
              <td>EGRESADO</td>
              <td />
            </tr>
          </table>
        </div> */}
      </>
    )
  );
}

// FuaDigital.propTypes = {
//   fua: PropTypes.object,
// };
