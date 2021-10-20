import React from 'react';
// import PropTypes from 'prop-types';

function Loading() {
  return (
    <div className="container-loading">
      <div className="spinner-frame">
        <div className="spinner-cover" />
        <div className="spinner-bar" />
      </div>
    </div>
  );
}

export default Loading;

// Loading.propTypes = {
//   onChange: PropTypes.func.isRequired,
// };
