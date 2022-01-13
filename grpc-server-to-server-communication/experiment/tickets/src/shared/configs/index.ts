import { DBConfigInterface, ServerInterface } from '../interfaces/server.interface';
import * as dotenv from 'dotenv';

dotenv.config();

// Handling the misconfiguration of services
if (!process.env.DNS) {
  throw new Error('No domains configured');
}

if (!process.env.PORT_HTTP_SELF) {
  throw new Error('No port configured for server');
}

if (!process.env.DNS_HTTP) {
  throw new Error('No http domain configured for service');
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
  grpcDNS: {
    self: process.env.DNS,
    events: `${process.env.DNS_HTTP}:${process.env.PORT_GRPC_EVENTS}`,
    invoices: `${process.env.DNS_HTTP}:${process.env.PORT_GRPC_INVOICES}`
  },
  httpPorts: {
    self: process.env.PORT_HTTP_SELF,
    events: process.env.PORT_HTTP_EVENTS || '',
    invoices: process.env.PORT_HTTP_INVOICES || ''
  },
  dnsHTTP: process.env.DNS_HTTP,
  db: dbConfig,
  isDevelopment: ['development', 'dev', 'local'].includes(process.env.NODE_ENV || 'dev')
};

if (process.env.CONFIGURED_SERVICES) {
  const availableServices = process.env.CONFIGURED_SERVICES.split(',');

  for (const service of availableServices) {
    if (!Object.keys(config.grpcDNS).includes(service)) {
      throw new Error(`No URL configured for ${service}`);
    }

    const grpcPort = process.env[`PORT_GRPC_${service.toUpperCase()}`];
    if (!grpcPort) {
      throw new Error(`No grpc port for ${service} configured for service`);
    }

    if (!Object.keys(config.httpPorts).includes(service)) {
      throw new Error(`No http port configured for ${service}`);
    }
  }
}

export default config;
