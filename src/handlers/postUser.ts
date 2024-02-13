import { IncomingMessage, ServerResponse } from 'http';
import { sendJSONResponse } from '../utils/sendResponse';
import { parseBody } from '../utils/parseBody';
import { sendErrorResponse } from '../utils/sendErrorResponses';
import { InMemoryDB } from '../db/InMemoryDB';

export async function postUser(req: IncomingMessage, res: ServerResponse, db: InMemoryDB) {
  try {
    const userData = await parseBody(req);
    const newUser = db.createUser(userData);
    if (newUser) {
      sendJSONResponse(res, 201, newUser);
    } else {
      sendErrorResponse(res, 400, 'Invalid Data');
    }
  } catch (error) {
    sendErrorResponse(res, 500);
  }
}
