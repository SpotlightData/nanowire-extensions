import * as R from 'ramda';
import { RequestError } from '../interfaces';
import { AxiosResponse } from 'axios';
import { map } from 'rxjs/operators';
import { BACKEND_RESPONSE_TYPES } from '../constants';
import { Result } from './Result';

export const extractErrorText = (error: RequestError, response: AxiosResponse | null): string => {
  if (response) {
    return (
      R.pathOr(false, ['data', 'message'], response) ||
      R.pathOr(false, ['data', 'description'], response) ||
      R.pathOr(false, ['data', 'error'], response) ||
      error.message
    );
  }
  return error.message || JSON.stringify(error);
};

export type ExtractedBackendError = {
  message: string;
  description: string;
  type: string;
  raw: RequestError['response'];
};

export const extractBackendError = (message: string) => (
  errorData: RequestError
): ExtractedBackendError => {
  if (!errorData) {
    return {
      message: 'No error data',
      description: 'Could not get any data from error response',
      type: BACKEND_RESPONSE_TYPES.UNKNOWN,
      raw: null,
    };
  }
  const response = R.propOr<null, RequestError, AxiosResponse>(null, 'response', errorData);
  return {
    message,
    description: extractErrorText(errorData, response),
    type: R.pathOr(BACKEND_RESPONSE_TYPES.UNKNOWN, ['data', 'type'], response),
    raw: errorData.response,
  };
};

export function formatBackendError(message: string) {
  return map(Result.errorMap(extractBackendError(message)));
}
