import UserController from '@controllers/user/index';
import { MockUserRepo } from '@repos/mocks/mockUserRepo';
import { NextFunction, Request } from 'express';

let userController: UserController;

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockNext: NextFunction = jest.fn();

const mockRequest = (): Request => {
  const req: any = {};
  req.body = jest.fn().mockReturnValue(req);
  req.params = jest.fn().mockReturnValue(req);
  req.query = jest.fn().mockReturnValue(req);
  return req as Request;
};

beforeEach(() => {
  userController = new UserController(new MockUserRepo());
});

test('GET /users/getuser Should 200 with an empty array of users', async () => {
  const req = mockRequest();
  const res = mockResponse();
  await userController.getUser(req, res, mockNext);
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({ users: [] });
});
