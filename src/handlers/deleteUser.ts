import { ServerResponse } from 'http';
import { sendJSONResponse } from '../utils/sendResponse';
import { db } from '../db/InMemoryDB';

export async function deleteUser(res: ServerResponse, id: string) {
  try {
    const success = db.deleteUser(id);
    sendJSONResponse(res, success ? 200 : 404, { message: success ? 'User deleted successfully' : 'User not found' });
  } catch (error) {
    sendJSONResponse(res, 500, { message: 'Internal Server Error' });
  }
}
