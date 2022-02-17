import { DatabaseConnection } from "..";

export const CreateInvoicesTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS invoices (
      id INT AUTO_INCREMENT PRIMARY KEY,
      addressee VARCHAR(100),
      event_id INT NOT NULL,
      no_of_attendees INT NOT NULL,
      is_paid TINYINT DEFAULT 0,
      created_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
      updated_at datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
  `;

  DatabaseConnection.query(sql, (err) => {
    if (err) console.log(err);
    else console.log('Invoices table migration successful')
  });
};
