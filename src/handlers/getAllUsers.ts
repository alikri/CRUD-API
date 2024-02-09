import { ServerResponse } from 'http';
import { sendJSONResponse } from '../utils/sendResponse';
import { db } from '../db/InMemoryDB';

export function getAllUsers(res: ServerResponse): void {
  try {
    const response = db.findAllUsers();
    if (response) throw new Error('No users found');
    sendJSONResponse(res, 200, response);
  } catch (error) {
    sendJSONResponse(res, 500, { message: 'Internal Server Error' });
  }
}
