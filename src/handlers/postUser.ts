import { IncomingMessage, ServerResponse } from 'http';
import { sendJSONResponse } from '../utils/sendResponse';
import { db } from '../db/InMemoryDB';
import { parseBody } from '../utils/parseBody';

export async function postUser(req: IncomingMessage, res: ServerResponse) {
  try {
    const userData = await parseBody(req);
    const newUser = db.createUser(userData);
    sendJSONResponse(res, 201, newUser);
  } catch (error) {
    sendJSONResponse(res, 500, { message: 'Internal Server Error' });
  }
}
