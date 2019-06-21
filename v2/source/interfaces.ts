import { AxiosError } from 'axios';

export type Dictionary<V> = { [key: string]: V };

export interface RequestError extends AxiosError {}
