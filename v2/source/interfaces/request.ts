import { AxiosError, AxiosRequestConfig } from 'axios';
import { Dictionary } from './shared';

export interface BackEndOptions extends AxiosRequestConfig {
  hasBase?: boolean;
  body?: any;
  aggregation?: string;
  query: Dictionary<string>;
}

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
