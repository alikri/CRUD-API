import { IncomingMessage, ServerResponse } from 'http';
import { sendJSONResponse } from '../utils/sendResponse';
import { db } from '../db/InMemoryDB';
import { parseBody } from '../utils/parseBody';

export async function putUser(req: IncomingMessage, res: ServerResponse, id: string) {
  try {
    const userData = await parseBody(req);
    const updatedUser = db.updateUser(id, userData);
  
    if (!updatedUser) throw new Error('User not found')
    sendJSONResponse(res, 200, updatedUser);
  } catch (error) {
    sendJSONResponse(res, 500, { message: 'Internal Server Error' });
  }
}
