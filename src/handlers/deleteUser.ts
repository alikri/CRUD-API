import { ServerResponse } from 'http';
import { sendJSONResponse } from '../utils/sendResponse';
import { db } from '../db/InMemoryDB';

export function deleteUser(res: ServerResponse, id: string) {
  const isDeleted = db.deleteUser(id);
  sendJSONResponse(res, isDeleted ? 200 : 404, { message: isDeleted ? 'User deleted successfully' : 'User not found' });
}
