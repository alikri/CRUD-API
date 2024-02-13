import { IncomingMessage } from 'http';
import { User } from 'db/InMemoryDB';

export function parseBody(req: IncomingMessage): Promise<User> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body);
        resolve(parsed);
      } catch (error) {
        reject(new Error('Error parsing JSON'));
      }
    });
    req.on('error', (err) => reject(err));
  });
}