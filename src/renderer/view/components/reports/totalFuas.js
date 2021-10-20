import React from 'react';
import PropTypes from 'prop-types';

const TotalFuas = ({ total }) => {
  return (
    <div className="text-center">
      <i>
        <b>TOTAL DE FORMATOS UNICOS DE ATENCION REGISTRADOS</b>
      </i>
      <h1>
        <b>{total}</b>
      </h1>
    </div>
  );
};

export default TotalFuas;

TotalFuas.defaultProps = {
  total: 0,
};
TotalFuas.propTypes = {
  total: PropTypes.number,
};
