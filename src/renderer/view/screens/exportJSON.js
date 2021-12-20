import React, { useState } from 'react';
import { Button, Row, Col, Form } from 'react-bootstrap';
import { format } from 'date-fns';
import ExampleController from '../../controller/ExampleController';
import TableReports from '../components/reports/table';
import TotalFuas from '../components/reports/totalFuas';
import Loading from '../components/absoluteLoading/loading';

export default function ExportJSON() {
  const [dataFuas, setDataFuas] = useState([]);
  const [inputValues, setInputValues] = useState({ of: '', to: '' });
  const [loading, setLoading] = useState(false);

  const handleExportJSON = async (initialDate, endDate) => {
    console.log('fechas', initialDate, endDate);
    setLoading(true);
    try {
      const attentions = await ExampleController.get(initialDate, endDate);
      attentions.forEach((a) => {
        a.ate_FecAlta = `${format(a.ate_FecAlta, 'yyyy-MM-dd HH:mm:ss')}`;
        a.ate_FecCrea = `${format(a.ate_FecCrea, 'yyyy-MM-dd HH:mm:ss')}`;
        a.ate_FecAte = `${format(a.ate_FecAte, 'yyyy-MM-dd HH:mm:ss')}`;
        a.ate_FecIng = `${format(a.ate_FecIng, 'yyyy-MM-dd HH:mm:ss')}`;
        a.ate_FecNac = `${format(a.ate_FecNac, 'yyyy-MM-dd HH:mm:ss')}`;
        a.ate_FecParto = a.ate_FecParto
          ? `${format(a.ate_FecParto, 'yyyy-MM-dd HH:mm:ss')}`
          : null;
        a.ate_FecTrans = a.ate_FecTrans
          ? `${format(a.ate_FecTrans, 'yyyy-MM-dd HH:mm:ss')}`
          : null;
      });
      console.log('attentions ', attentions);
      setDataFuas(attentions);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputs = (name, value) => {
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleSubmitForm = () => {
    const initialDate = `${inputValues.of} 00:00:00`;
    const endDate = `${inputValues.to} 23:59:59`;
    handleExportJSON(initialDate, endDate);
  };

  const exportDataToJSON = () => {
    const date = new Date();
    const actualDate = `${format(date, 'dd-MM-yyyy hh.mm.ss')}`;
    const a = document.createElement('a');
    a.href = URL.createObjectURL(
      new Blob([JSON.stringify(dataFuas, null, 2)], {
        type: 'application/json',
      })
    );
    a.setAttribute('download', `registed_FUAS_${actualDate}.json`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  return (
    <>
      <Row>
        <Col xs={3} md={2} className="sidebar">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>DE</Form.Label>
              <Form.Control
                type="date"
                value={inputValues.of}
                onChange={({ target: { value } }) => handleInputs('of', value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>AL</Form.Label>
              <Form.Control
                type="date"
                value={inputValues.to}
                onChange={({ target: { value } }) => handleInputs('to', value)}
              />
            </Form.Group>
            <hr />
            <div className="d-grid gap-2">
              <Button
                variant="primary"
                type="button"
                onClick={() => handleSubmitForm()}
                disabled={!inputValues.of || !inputValues.to}
              >
                CONSULTAR
              </Button>
            </div>
          </Form>
          <hr />
          <TotalFuas total={dataFuas.length} />
          <hr />
          <div className="d-grid gap-2">
            <Button
              variant="primary"
              type="button"
              onClick={() => exportDataToJSON()}
              disabled={
                !inputValues.of || !inputValues.to || !dataFuas.length > 0
              }
            >
              EXPORTAR DATOS
            </Button>
          </div>
        </Col>
        <Col xs={9} md={10}>
          <div className="table-container">
            <TableReports dataFuas={dataFuas} />
          </div>
        </Col>
      </Row>
      {loading && <Loading />}
    </>
  );
}
