import { ServerResponse } from 'http';
import { sendJSONResponse } from '../utils/sendResponse';
import { db } from '../db/InMemoryDB';

export function getAllUsers(res: ServerResponse): void {
  const response = db.findAllUsers();
  if (response) throw new Error('No users found');
  sendJSONResponse(res, 200, response);
}
