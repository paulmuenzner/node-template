import { IUser } from '../../interfaces';
import { IUserRepo } from '../index';

export class MockUserRepo implements IUserRepo {
  private users: IUser[] = [];

  constructor() {}

  async getUsers(): Promise<IUser[]> {
    return this.users;
  }
}
