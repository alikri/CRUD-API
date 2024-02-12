import { IncomingMessage, ServerResponse } from 'http';
import { sendJSONResponse } from '../utils/sendResponse';
import { parseBody } from '../utils/parseBody';
import { sendErrorResponse } from '../utils/sendErrorResponses';
import { InMemoryDB } from '../db/InMemoryDB';

export async function putUser(req: IncomingMessage, res: ServerResponse, id: string, db: InMemoryDB) {
    const userData = await parseBody(req);
    const updatedUser = db.updateUser(id, userData);
  if (updatedUser) {
    sendJSONResponse(res, 200, updatedUser);
  } else {
    sendErrorResponse(res, 404)
  }
}
