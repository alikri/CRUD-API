import { ServerResponse } from 'http';

interface CodeMessage {
  [key: number]: string;
}

const codeMessage: CodeMessage = {
  400: 'Invalid UUID format for userId',
  404: 'User with provided ID is not found',
  500: 'Internal Server Error',
};

export const errorResponse = (res: ServerResponse, statusCode: number, customMessage?: string) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: customMessage ? customMessage : codeMessage[statusCode] }));
};
