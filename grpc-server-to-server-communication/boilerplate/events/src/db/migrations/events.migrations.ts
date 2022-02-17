import { DatabaseConnection } from "..";

export const CreateEventsTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS events (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      organizer VARCHAR(255),
      venue VARCHAR(255),
      starts_at datetime(6) DEFAULT NULL,
      seats INT DEFAULT NULL,
      created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
  `;

  DatabaseConnection.query(sql, (err) => {
    if (err) console.log(err);
    else console.log('Events table migration successful')
  });
};
