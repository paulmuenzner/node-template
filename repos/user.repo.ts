import { IUser } from '../interfaces';

/**
 * @interface IUserRepo
 * @desc Responsible for pulling users from persistence.
 **/

export interface IUserRepo {
  // Exported
  getUsers(): Promise<IUser[]>;
}

class UserRepo implements IUserRepo {
  constructor() {}

  async getUsers(): Promise<IUser[]> {
    const data = await [
      {
        firstName: 'Jon',
        surName: 'Jon',
        email: 'jane.doe@example.com',
        _id: '4ecc05e55dd98a436ddcc47c',
        telephone: '+001123456789',
        country: 'US',
        createdAt: '1715774642227',
        updatedAt: '1715947438966',
      },
    ];

    return data;
  }
}
