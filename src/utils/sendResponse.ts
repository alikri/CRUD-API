import { ServerResponse } from 'http';

export function sendJSONResponse(res: ServerResponse, statusCode: number, data: object): void {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}
