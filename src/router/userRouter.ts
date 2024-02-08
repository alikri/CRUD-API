import { IncomingMessage, ServerResponse } from 'http';
import { db } from '../db/InMemoryDB';
import { parseBody } from '../utils/parseBody';

export async function userRouter(req: IncomingMessage, res: ServerResponse) {
  const { method, url } = req;

  if (url?.startsWith('/users') && method === 'GET') {
    const id = url.split('/')[2];
    const response = id ? db.findUserById(id) : db.findAllUsers();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
  } else if (url === '/users' && method === 'POST') {
    const userData = await parseBody(req);
    const newUser = db.createUser(userData);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newUser));

  } else if (url?.startsWith('/users/') && method === 'PUT') {
    const id = url.split('/')[2];
    const userData = await parseBody(req);

    if (id) {
      const updatedUser = db.updateUser(id, userData);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(updatedUser));
    }
  } else if (url?.startsWith('/users/') && method === 'DELETE') {
    const id = url.split('/')[2];

    if (id) {
      const response = db.deleteUser(id);
      
      res.writeHead(response ? 200 : 404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: response ? 'User deleted successfully' : 'User not found' }));
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Not Found' }));
  }
}
