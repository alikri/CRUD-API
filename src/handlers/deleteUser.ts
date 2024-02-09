import { ServerResponse } from 'http';
import { sendJSONResponse } from '../utils/sendResponse';
import { db } from '../db/InMemoryDB';
import { errorResponse } from 'utils/errorResponses';

export function deleteUser(res: ServerResponse, id: string) {
  const isDeleted = db.deleteUser(id);
  if (isDeleted) {
    sendJSONResponse(res, 204, { message: 'User deleted successfully'});
  } else {
    errorResponse(res, 404)
  }
}
