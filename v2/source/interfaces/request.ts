import { AxiosError } from 'axios';

export interface RequestError extends AxiosError {}

export interface UserResponse {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  passwordLastUpdated: string;
  failedLogins: number;
  token: string;
}
