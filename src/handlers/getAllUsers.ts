import { ServerResponse } from 'http';
import { sendJSONResponse } from '../utils/sendResponse';
import { db } from '../db/InMemoryDB';

export function getAllUsers(res: ServerResponse): void {
  const response = db.findAllUsers();
  if (response.length !== 0) {
    sendJSONResponse(res, 200, response);
  } else {
    sendJSONResponse(res, 200, {message: 'Users list is empty'});
  }
}
