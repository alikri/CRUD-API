import { ServerResponse } from 'http';
import { sendJSONResponse } from '../utils/sendResponse';
import { db } from '../db/InMemoryDB';

export function getAllUsers(res: ServerResponse): void {
  const response = db.findAllUsers();
  sendJSONResponse(res, 200, response);
  
}
