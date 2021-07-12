export interface IUserCreateResponse {
  ok: boolean;
  user: IUser;
}

export interface IUserGetByIdResponse extends IUserCreateResponse {}

export interface IUser {
  username: string;
  email: string;
  role: string;
  id: number;
  isActive: boolean;
}

export interface IUsersGetAllResponse {
  ok: boolean;
  users: IUser[];
  total: number;
  actived: number;
  deactived: number;
}
