import { IncomingMessage, ServerResponse } from 'http';
import { errorResponse } from '../utils/errorResponses';
import { getUser } from '../handlers/getUser';
import { postUser } from '../handlers/postUser';
import { putUser } from '../handlers/putUser';
import { deleteUser } from '../handlers/deleteUser';
import { getAllUsers } from '../handlers/getAllUsers';
import { isValidUuid } from '../utils/validateUuid';

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export async function dispatcher(req: IncomingMessage, res: ServerResponse) {
  const { method, url } = req;
  const id = url?.split('/')[3];

  try {
    if (url?.startsWith('/api/users')) {
      if (id && !isValidUuid(id)) {
        errorResponse(res, 400);
        return;
      }
    
      switch (method) {
        case HttpMethod.GET:
          if (id) {
            getUser(res, id);
          } else {
            getAllUsers(res);
          }
          break;
        case HttpMethod.POST:
          postUser(req, res);
          break;
        case HttpMethod.PUT:
          if (id) {
            await putUser(req, res, id);
          } else {
            errorResponse(res, 404, 'Missing user ID');
          }
          break;
        case HttpMethod.DELETE:
          if (id) {
            deleteUser(res, id);
          } else {
            errorResponse(res, 404, 'Missing user ID');
          }
          break;
        default:
          errorResponse(res, 500);
          break;
      }
    } else {
      errorResponse(res, 404, 'Address not found');
    }
  } catch (error) {
    errorResponse(res, 500);
  }
}
