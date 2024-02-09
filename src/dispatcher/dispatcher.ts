import { IncomingMessage, ServerResponse } from 'http';
import { ErrorResponse } from 'utils/errorResponses';
import { getUser } from '../handlers/getUser';
import { postUser } from '../handlers/postUser';
import { putUser } from '../handlers/putUser';
import { deleteUser } from '../handlers/deleteUser';
import { getAllUsers } from '../handlers/getAllUsers';

export async function dispatcher(req: IncomingMessage, res: ServerResponse) {
  const { method, url } = req;
  const id = url?.split('/')[3];

  try {
    if (url?.startsWith('/api/users')) {
      switch (method) {
        case 'GET':
          if (id) {
            getUser(res, id);
          } else {
            getAllUsers(res);
          }
          break;
        case 'POST':
          postUser(req, res);
          break;
        case 'PUT':
          if (id) {
            await putUser(req, res, id);
          } else {
            ErrorResponse(res, 400);
          }
          break;
        case 'DELETE':
          if (id) {
            deleteUser(res, id);
          } else {
            ErrorResponse(res, 400);
          }
          break;
        default:
          ErrorResponse(res, 405);
          break;
      }
    } else {
      ErrorResponse(res, 404);
    }
  } catch (error) {
    ErrorResponse(res, 500);
  }
}
