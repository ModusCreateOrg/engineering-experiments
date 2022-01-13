import { DBConfigInterface, ServerInterface } from '../interfaces/server.interface';
import * as dotenv from 'dotenv';

dotenv.config();

const dbConfig: DBConfigInterface = Object.create(null);
const dbParams = ['name', 'host', 'user', 'pass'];

for (const param of dbParams) {
  const key   = param as keyof DBConfigInterface;
  const value = process.env[`DB_${param.toUpperCase()}`];

  if (!value) {
    throw new Error(`No database ${param} configured for service`);
  }

  dbConfig[key] = value;
}

const config: ServerInterface = {
  db: dbConfig,
  isDevelopment: ['development', 'dev', 'local'].includes(process.env.NODE_ENV || 'dev')
};

export default config;
