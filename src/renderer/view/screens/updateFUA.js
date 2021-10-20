import React, { useState } from 'react';
import { Button, Row, Col, Form, Table } from 'react-bootstrap';
import { format } from 'date-fns';
import fuaController from '../../controller/fuaController';
import TableReports from '../components/reports/table';
import TotalFuas from '../components/reports/totalFuas';
import InputFile from '../components/input/inputFile';
import FuaDigital from '../components/fua/fuaDigital';
import Loading from '../components/absoluteLoading/loading';

export default function UpdateFUA() {
  const [dataFuas, setdataFuas] = useState([]);
  const [inputValues, setInputValues] = useState({ lot: '', formatNumber: '' });
  const [loading, setLoading] = useState(false);

  const handleSearchFua = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await fuaController.search(
        inputValues.lot,
        inputValues.formatNumber
      );
      setdataFuas(result);
      console.log('result ', result);
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

  return (
    <>
      <Row>
        <Col xs={4} md={3} className="sidebar">
          <form onSubmit={(e) => handleSearchFua(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Buscar FUA</Form.Label>
              <div className="d-flex align-items-center">
                <Form.Control
                  type="text"
                  value={inputValues.lot}
                  onChange={({ target: { value } }) =>
                    handleInputs('lot', value)
                  }
                  maxLength={2}
                  style={{ width: '50px' }}
                />
                -
                <Form.Control
                  type="text"
                  value={inputValues.formatNumber}
                  onChange={({ target: { value } }) =>
                    handleInputs('formatNumber', value)
                  }
                />
              </div>
            </Form.Group>
            <Button variant="primary" type="submit">
              BUSCAR
            </Button>
          </form>
          {dataFuas.map((fua) => (
            <div key={fua.ate_Numero}>
              <hr />
              <b>{`${fua.ate_Lote}-${fua.ate_Numero}`}</b>
              <br />
              <i>{`${fua.ate_ApePaterno} ${fua.ate_ApeMaterno}
            ${fua.ate_PriNombre}  ${fua.ate_OtrNombre || ''}`}</i>
            </div>
          ))}
        </Col>
        <Col xs={8} md={9}>
          <div className="table-container">
            <FuaDigital dataFuas={dataFuas[0] || null} />
          </div>
        </Col>
      </Row>
      {loading && <Loading />}
    </>
  );
}
