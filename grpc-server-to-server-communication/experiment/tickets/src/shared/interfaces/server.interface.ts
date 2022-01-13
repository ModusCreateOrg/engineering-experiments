export interface DNSConfigInterface {
  self: string,
  events: string
  invoices: string,
}

export interface DBConfigInterface {
  name: string,
  host: string,
  user: string,
  pass: string,
}

export interface ServerInterface {
  db: DBConfigInterface;

  grpcDNS: DNSConfigInterface;

  isDevelopment: boolean;

  dnsHTTP: string;

  httpPorts: DNSConfigInterface;
}
