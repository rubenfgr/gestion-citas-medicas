interface IUserCreateResponse {
  ok: boolean;
  user: IUser;
}

interface IUserGetByIdResponse extends IUserCreateResponse {}

interface IUser {
  username: string;
  email: string;
  role: string;
  id: number;
  isActive: boolean;
}

interface IUsersGetAllResponse {
  ok: boolean;
  users: IUser[];
  total: number;
  actived: number;
  deactived: number;
}
