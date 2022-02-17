export interface HttpRequestConfigInterface {
  hostname: string,
  path: string,
  method: 'GET' | 'POST',
  port: number
}
