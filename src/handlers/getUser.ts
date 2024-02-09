import { ServerResponse } from 'http';
import { sendJSONResponse } from '../utils/sendResponse';
import { db } from '../db/InMemoryDB'; 
import { sendErrorResponse } from '../utils/sendErrorResponses';

export function getUser(res: ServerResponse, id: string) {
  const response = db.findUserById(id);
  if (response) {
    sendJSONResponse(res, 200, response);
  } else {
    sendErrorResponse(res, 404);
  }
}
