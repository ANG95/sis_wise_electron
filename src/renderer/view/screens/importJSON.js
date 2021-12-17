import React, { useState } from 'react';
import { Button, Row, Col, Form, Table } from 'react-bootstrap';
import { format } from 'date-fns';
import FUAController from '../../controller/fuaController';
import TableReports from '../components/reports/table';
import TotalFuas from '../components/reports/totalFuas';
import InputFile from '../components/input/inputFile';
import Loading from '../components/absoluteLoading/loading';

const fs = require('fs');

export default function ImportJSON() {
  const [dataFuas, setdataFuas] = useState([]);
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
  const saveDate = async () => {
    setLoading(true);
    try {
      const attentions = await FUAController.insertImportedData(dataFuas);
      if (attentions.affectedRows > 0) {
        const notification = new window.Notification('GENIAL TODO SALIO BIEN', {
          body: `Se importaron un total${attentions.affectedRows}de registros`,
          icon: 'https://www.pngfind.com/pngs/m/5-59727_not-good-not-good-icon-hd-png-download.png',
        });

        notification.onclick = () => console.log('Clicked');
        notification.onclose = () => console.log('Closed');
      } else {
        const notifications = new window.Notification('OCURRIO UN ERROR ', {
          body: 'NO PUDE IMPORTAR NINGUN REGISTRO',
          icon: 'https://i.pinimg.com/originals/12/41/04/124104ecdc938f8a4d2e29b9cc474b30.jpg',
        });
        notifications.onclose = () => console.log('Closed');
      }
      // setDataFuas(attentions);
    } catch (error) {
      console.log(error);
      const notification = new window.Notification(
        'OCURRIO UN ERROR INSESPERADO',
        {
          body: error,
          icon: 'https://www.seekpng.com/png/detail/334-3345964_error-icon-download-attention-symbol.png',
        }
      );
      notification.onclose = () => console.log('Closed');
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
          <button onClick={() => saveDate()} type="button">
            Guardar
          </button>
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
