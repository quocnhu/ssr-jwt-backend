//Create a connection to database
import mysql from 'mysql2/promise'

const poolsql = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'p@ssw0rdN',
    database: 'jwt',
    port:3308,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
export {poolsql}