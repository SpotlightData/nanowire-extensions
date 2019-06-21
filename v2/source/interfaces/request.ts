import { AxiosError } from 'axios';

export interface RequestError extends AxiosError {}

export interface UserMeta {
  _id: string;
  name: string;
  email: string;
}
export interface UserResponse extends UserMeta {
  isAdmin: boolean;
  passwordLastUpdated: string;
  failedLogins: number;
  token: string;
}
