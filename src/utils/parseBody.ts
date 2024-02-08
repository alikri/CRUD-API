import { IncomingMessage } from 'http';
import { User } from 'db/InMemoryDB';

export function parseBody(req: IncomingMessage): Promise<User> {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      resolve(JSON.parse(body));
    });

    req.on('error', (err) => console.log(err.message))
  });
}
