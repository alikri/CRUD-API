import { ServerResponse } from 'http';

interface CodeMessage {
  [key: number]: string;
}

const codeMessage: CodeMessage = {
  400: 'Missing user ID for deletion',
  404: 'Not Found',
  405: 'Method Not Allowed',
  500: 'Internal Server Error',
};

export const ErrorResponse = (res: ServerResponse, statusCode: number) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: codeMessage[statusCode] }));
};
