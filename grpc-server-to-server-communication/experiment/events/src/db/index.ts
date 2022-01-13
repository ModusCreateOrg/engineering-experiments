import mysql from "mysql2";
import config from "../shared/configs";

export const DatabaseConnection = mysql.createConnection({
  host: config.db.host,
  user: config.db.user,
  password: config.db.pass,
  database: config.db.name
});
