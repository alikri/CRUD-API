import { ServerResponse } from 'http';
import { sendJSONResponse } from '../utils/sendResponse';
import { InMemoryDB } from '../db/InMemoryDB';

export function getAllUsers(res: ServerResponse, db: InMemoryDB): void {
  const response = db.findAllUsers();
  sendJSONResponse(res, 200, response);
}
