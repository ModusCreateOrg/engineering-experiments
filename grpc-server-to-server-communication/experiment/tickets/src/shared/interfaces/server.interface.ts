export interface DBConfigInterface {
  name: string,
  host: string,
  user: string,
  pass: string,
}

export interface ServerInterface {
  db: DBConfigInterface;

  isDevelopment: boolean;
}
