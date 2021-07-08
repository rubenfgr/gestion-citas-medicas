import { Role } from './role.enum';
export interface IUser {
  id: number;
  username: string;
  email: string;
  role: Role;
}
