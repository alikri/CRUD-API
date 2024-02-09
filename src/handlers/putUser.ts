import { IncomingMessage, ServerResponse } from 'http';
import { sendJSONResponse } from '../utils/sendResponse';
import { db } from '../db/InMemoryDB';
import { parseBody } from '../utils/parseBody';
import { errorResponse } from 'utils/errorResponses';

export async function putUser(req: IncomingMessage, res: ServerResponse, id: string) {
    const userData = await parseBody(req);
    const updatedUser = db.updateUser(id, userData);
  if (updatedUser) {
    sendJSONResponse(res, 200, updatedUser);
  } else {
    errorResponse(res, 404)
  }
}
