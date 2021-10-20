import React from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function TableReports({ dataFuas }) {
  return (
    <Table striped hover>
      <thead className="thead-dark">
        <tr>
          <th>#</th>
          <th>N° FORMATO</th>
          <th>APELLIDOS Y NOMBRES</th>
          <th>DNI</th>
          <th>ATENDIDO POR: </th>
        </tr>
      </thead>
      <tbody>
        {dataFuas.map((register, i) => (
          <tr key={`${register.ate_NroDocumento}-${i * 5}`}>
            <td>{i + 1}</td>
            <td>
              {register.ate_IdDisa}-{register.ate_Lote}-{register.ate_Numero}
            </td>
            <td>{`${register.ate_ApePaterno} ${register.ate_ApeMaterno}
            ${register.ate_PriNombre}  ${register.ate_OtrNombre || ''}`}</td>
            <td>{register.ate_NroDocumento}</td>
            <td>{register.ate_Profesional}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
TableReports.defaultProps = {
  dataFuas: [],
};
TableReports.propTypes = {
  dataFuas: PropTypes.arrayOf(
    PropTypes.shape({
      ate_ApePaterno: PropTypes.string,
      ate_ApeMaterno: PropTypes.string,
      ate_PriNombre: PropTypes.string,
      ate_OtrNombre: PropTypes.string,
      ate_NroDocumento: PropTypes.string,
      ate_Profesional: PropTypes.string,
    })
  ),
};
