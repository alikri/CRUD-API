import { IncomingMessage, ServerResponse } from 'http';
import { sendJSONResponse } from '../utils/sendResponse';
import { db } from '../db/InMemoryDB';
import { parseBody } from '../utils/parseBody';
import { errorResponse } from '../utils/errorResponses';

export async function postUser(req: IncomingMessage, res: ServerResponse) {
  const userData = await parseBody(req);
  const newUser = db.createUser(userData);
  if (newUser) {
    sendJSONResponse(res, 201, newUser);
  } else {
    errorResponse(res, 400, 'Missing one of the required fields or ivalid data type: username: string, age: number, hobbies: array of strings')
  }
}
