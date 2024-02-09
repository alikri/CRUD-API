import { ServerResponse } from 'http';
import { sendJSONResponse } from '../utils/sendResponse';
import { db } from '../db/InMemoryDB'; 

export function getUser(res: ServerResponse, id: string) {
  try {
    const response = db.findUserById(id);
    if (!response) throw new Error('User not found');
    sendJSONResponse(res, 200, response);

  } catch (error) {
    sendJSONResponse(res, 500, { message: 'Internal Server Error' });
  }
}
