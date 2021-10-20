import React, { useState } from 'react';
import { Button, Row, Col, Form, Table } from 'react-bootstrap';
import { format } from 'date-fns';
import ExampleController from '../../controller/ExampleController';
import TableReports from '../components/reports/table';
import TotalFuas from '../components/reports/totalFuas';
import InputFile from '../components/input/inputFile';
import Loading from '../components/absoluteLoading/loading';

const fs = require('fs');

export default function ImportJSON() {
  const [inputFile, setinputFile] = useState(null);
  const [dataFuas, setdataFuas] = useState([]);
  const [inputValues, setInputValues] = useState({ of: '', to: '' });
  const [loading, setLoading] = useState(false);

  const handleImportJSONFIle = async (file) => {
    console.log('file', file);
    setLoading(true);

    try {
      const data = await fs.readFileSync(file[0].path, 'utf8');
      const parseData = JSON.parse(data);
      console.log(parseData);

      setdataFuas(parseData);
    } catch (e) {
      console.log('Error:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Row>
        <Col xs={3} md={2} className="sidebar">
          <TotalFuas total={dataFuas.length} />
          <hr />
          <Form.Group className="mb-3 text-center">
            <InputFile
              onChange={({ target: { files } }) => handleImportJSONFIle(files)}
            />
          </Form.Group>
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
