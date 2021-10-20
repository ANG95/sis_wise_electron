import React from 'react';
import PropTypes from 'prop-types';

function InputFile({ onChange }) {
  return (
    <>
      <label htmlFor="upload-file" className="upload-photo">
        Seleccione el archivo
        <input
          type="file"
          name="photo"
          id="upload-file"
          accept=".json"
          onChange={onChange}
        />
      </label>
    </>
  );
}

export default InputFile;

InputFile.propTypes = {
  onChange: PropTypes.func.isRequired,
};
