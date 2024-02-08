import { ServerResponse } from 'http';
import { sendJSONResponse } from '../utils/sendResponse';
import { db } from '../db/InMemoryDB';

export async function getAllUsers(res: ServerResponse): Promise<void> {
  try {
    const response = db.findAllUsers();
    if (response) {
      sendJSONResponse(res, 200, response);
    }
  } catch (error) {
    sendJSONResponse(res, 500, { message: 'Internal Server Error' });
  }
}
