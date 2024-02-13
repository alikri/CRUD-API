import { ServerResponse } from 'http';
import { sendJSONResponse } from '../utils/sendResponse';
import { InMemoryDB } from '../db/InMemoryDB';
import { sendErrorResponse } from '../utils/sendErrorResponses';

export function deleteUser(res: ServerResponse, id: string, db: InMemoryDB) {
  const isDeleted = db.deleteUser(id);
  if (isDeleted) {
    sendJSONResponse(res, 204, { message: 'User deleted successfully' });
  } else {
    sendErrorResponse(res, 404);
  }
}
