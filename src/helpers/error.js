import { pathOr } from 'ramda';

export const extractErrorText = (error, response) => {
  if (response) {
    return (
      pathOr(false, ['data', 'message'], response) ||
      pathOr(false, ['data', 'description'], response) ||
      pathOr(false, ['data', 'error'], response) ||
      error.message
    );
  }
  return error.message || JSON.stringify(data);
};

export const extractBackendError = message => errorData => {
  const error = errorData || {};
  const response = pathOr({}, ['response'], error);
  return {
    message,
    description: extractErrorText(error, response),
    type: pathOr(false, ['data', 'type'], response),
    raw: { ...response.data, status: response.status },
  };
};
