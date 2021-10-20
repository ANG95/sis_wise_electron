import React, { useState } from 'react';
import { Row, Col, Form, Table, Button } from 'react-bootstrap';
import { format, startOfWeek, endOfWeek } from 'date-fns';
import TableReports from './view/components/reports/table';
import TotalFuas from './view/components/reports/totalFuas';
import Loading from './view/components/absoluteLoading/loading';

const ExampleController = require('./controller/ExampleController');

const MysqlExample = () => {
  const [dataFuas, setdataFuas] = useState([]);
  const [inputValues, setInputValues] = useState({ of: '', to: '' });
  const [loading, setLoading] = useState(false);

  const handleQueryExecute = async (initialDate, endDate) => {
    setLoading(true);

    try {
      const attentions = await ExampleController.get(initialDate, endDate);
      setdataFuas(attentions);
    } catch (error) {
      console.log(error);
      const notification = new window.Notification(
        'LO SIENTO OCURRIO EL ERROR:',
        {
          body: error,
          icon: 'https://www.seekpng.com/png/detail/334-3345964_error-icon-download-attention-symbol.png',
        }
      );

      notification.onclick = () => console.log('Clicked');
      notification.onclose = () => console.log('Closed');
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
    handleQueryExecute(initialDate, endDate);
  };

  const weeklyReport = () => {
    const curr = new Date();

    const firstDay = startOfWeek(curr, { weekStartsOn: 1 });
    const lastDay = endOfWeek(curr, { weekStartsOn: 1 });

    const initialDate = `${format(firstDay, 'yyyy-MM-dd hh:mm:ss')}`;
    const endDate = `${format(lastDay, 'yyyy-MM-dd hh:mm:ss')}`;
    const setValues = {
      of: format(firstDay, 'yyyy-MM-dd'),
      to: format(lastDay, 'yyyy-MM-dd'),
    };
    setInputValues(setValues);
    handleQueryExecute(initialDate, endDate);
  };

  const actualDate = () => {
    const date = new Date();
    const initialDate = `${format(date, 'yyyy-MM-dd')} 00:00:00`;
    const endDate = `${format(date, 'yyyy-MM-dd')} 23:59:59`;
    const setValues = {
      of: format(date, 'yyyy-MM-dd'),
      to: format(date, 'yyyy-MM-dd'),
    };
    setInputValues(setValues);
    handleQueryExecute(initialDate, endDate);
  };
  return (
    <>
      <Row>
        <Col xs={3} md={2} className="sidebar">
          <div className="d-grid gap-2">
            <Button variant="info" size="lg" onClick={() => actualDate()}>
              HOY
            </Button>
          </div>
          <hr />
          <div className="d-grid gap-2">
            <Button variant="warning" size="lg" onClick={() => weeklyReport()}>
              REPORTE SEMANAL
            </Button>
          </div>
          <hr />
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
};

export default MysqlExample;
