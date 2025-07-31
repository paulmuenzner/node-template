import { Logger } from '@config';
import { IUserRepo } from '@repos';
import { catchAsync } from '@utils';
const logger = new Logger();

/**
 * @class UserController
 * @desc Responsible for handling API requests for the
 * /user route.
 **/

class UserController {
  private userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  getUser = catchAsync(async (req, res, next) => {
    const users = await this.userRepo.getUsers();
    res.status(200).json({ users });
  });
}

export default UserController;
