import { IncomingMessage, ServerResponse } from 'http';
import { sendErrorResponse } from '../utils/sendErrorResponses';
import { getUser } from '../handlers/getUser';
import { postUser } from '../handlers/postUser';
import { putUser } from '../handlers/putUser';
import { deleteUser } from '../handlers/deleteUser';
import { getAllUsers } from '../handlers/getAllUsers';
import { isValidUuid } from '../utils/validateUuid';
import { InMemoryDB } from '../db/InMemoryDB';

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export async function dispatcher(req: IncomingMessage, res: ServerResponse, db: InMemoryDB) {
  console.log(`Request handled by pid ${process.pid}`);

  const { method, url } = req;
  const id = url?.split('/')[3];

  try {
    if (url?.startsWith('/api/users')) {
      if (id && !isValidUuid(id)) {
        sendErrorResponse(res, 400);
        return;
      }

      switch (method) {
        case HttpMethod.GET:
          if (id) {
            getUser(res, id, db);
          } else {
            getAllUsers(res, db);
          }
          break;
        case HttpMethod.POST:
          postUser(req, res, db);
          break;
        case HttpMethod.PUT:
          if (id) {
            await putUser(req, res, id, db);
          } else {
            sendErrorResponse(res, 404, 'Missing user ID');
          }
          break;
        case HttpMethod.DELETE:
          if (id) {
            deleteUser(res, id, db);
          } else {
            sendErrorResponse(res, 404, 'Missing user ID');
          }
          break;
        default:
          sendErrorResponse(res, 500);
          break;
      }
    } else {
      sendErrorResponse(res, 404, 'Address not found');
    }
  } catch (error) {
    sendErrorResponse(res, 500);
  }
}
