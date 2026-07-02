const mysql = require("mysql2");

console.log("host =", process.env.host);
console.log("user =", process.env.user);
console.log("password =", process.env.password);
console.log("database =", process.env.database);

const pool = mysql.createPool({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool.promise();