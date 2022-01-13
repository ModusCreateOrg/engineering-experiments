import { DBConfigInterface, ServerInterface } from '../interfaces/server.interface';
import * as dotenv from 'dotenv';

dotenv.config();

// Handling the misconfiguration of services
if (!process.env.DNS) {
  throw new Error('No domains configured');
}

if (!process.env.PORT_SELF) {
  throw new Error('No port configured for server');
}

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
  ports: {
    self: process.env.PORT_SELF,
    events: process.env.PORT_HTTP_EVENTS || '',
    tickets: process.env.PORT_HTTP_TICKETS || ''
  },
  dns: process.env.DNS,
  db: dbConfig,
  isDevelopment: ['development', 'dev', 'local'].includes(process.env.NODE_ENV || 'dev')
};

export default config;
