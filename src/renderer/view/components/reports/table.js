/* eslint-disable no-underscore-dangle */
import React, { useState, useMemo } from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Pagination from '../pagination/pagination';

const PageSize = 20;

export default function TableReports({ dataFuas }) {
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return dataFuas.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, dataFuas]);

  return (
    <>
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
          {currentTableData.map((register, i) => (
            <tr key={`${register.ate_NroDocumento}-${i * 5}`}>
              <td>{register._INDEX || i + 1}</td>
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
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={dataFuas.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
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
