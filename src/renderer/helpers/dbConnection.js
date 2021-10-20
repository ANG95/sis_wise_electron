/* eslint-disable no-console */
const mysql = require('mysql');
const util = require('util');

const DBcon = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'bdsis_data',
  port: 3306,
  multipleStatements: true,
});
DBcon.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.log('La conexión de la base de datos se cerró.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.log('La base de datos tiene demasiadas conexiones.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.log(
        'Se rechazó la conexión a la base de datos. ❕❕⚠ POR FAVOR ENCIENDA EL SERVICIO DE BASE DE DATOS ❕❕⚠'
      );
    }
  }
  if (connection) connection.release();
});
DBcon.query = util.promisify(DBcon.query);

module.exports = DBcon;
