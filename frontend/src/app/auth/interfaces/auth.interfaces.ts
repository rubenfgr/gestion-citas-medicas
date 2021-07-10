import { IUser } from './../../users/interfaces/users.interfaces';

export interface ILogin {
  access_token: string;
  user: IUser;
}

export interface IRenewToken extends ILogin {}
