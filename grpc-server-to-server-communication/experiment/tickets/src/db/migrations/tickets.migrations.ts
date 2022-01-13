import { DatabaseConnection } from "..";

export const CreateTicketsTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS tickets (
      id INT AUTO_INCREMENT PRIMARY KEY,
      event_id INT NOT NULL,
      invoice_id INT NOT NULL,
      valid_until datetime(6) DEFAULT NULL,
      created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
  `;

  DatabaseConnection.query(sql, (err) => {
    if (err) console.log(err);
    else console.log('Tickets table migration successful')
  });
};